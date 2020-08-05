<!-- @format -->

<template>
  <div>
    <!-- 预览 -->
    <media v-loading="transcoding" :no-lazy="true" :data="preview"></media>
    <el-upload
      ref="upload"
      action
      :auto-upload="false"
      multiple
      :http-request="upload"
      accept="video/*"
      :limit="1"
      :on-change="changeHandler"
      :on-remove="changeHandler"
      :file-list="fileList"
    >
      <el-button
        style="margin-left: 5px;"
        size="small"
        slot="trigger"
        type="primary"
        >选择
      </el-button>
      <el-button
        style="margin: 0 5px;"
        size="small"
        :disabled="transcoding || disabledTranscoding"
        type="success"
        @click="() => $refs.upload.submit()"
        >上传到服务器
      </el-button>
      <!-- 转码以及配置器 -->
      <el-popover placement="top" width="160" v-model="ffmpegConfig.visible">
        <h4>转码配置</h4>
        <div>
          <label>码率</label>
          <el-input placeholder="码率" v-model="ffmpegConfig.rate"></el-input>
        </div>
        <br />
        <div>
          <label>分辨率</label>
          <el-select v-model="ffmpegConfig.scale" placeholder="请选择">
            <el-option
              :key="option"
              v-for="option of ffmpegConfig.scaleOptions"
              :label="option"
              :value="option"
            ></el-option>
          </el-select>
        </div>
        <br />
        <div style="text-align: right; margin: 0">
          <el-button
            size="mini"
            type="text"
            @click="ffmpegConfig.visible = false"
            >取消</el-button
          >
          <el-button type="primary" size="mini" @click="startTranscode"
            >确定</el-button
          >
        </div>
        <el-button
          slot="reference"
          :disabled="disabledTranscoding"
          :loading="!ffmpegLoaded || transcoding"
          icon="el-icon-refresh"
          >转码
        </el-button>
      </el-popover>
      <el-progress
        style="margin-top: 5px;"
        v-if="cache"
        :percentage="cache.percentage"
      ></el-progress>
    </el-upload>
  </div>
</template>

<script>
import Media from "#/components/SeedTable/render/Media";
import debounce from "lodash-es/debounce";

export default {
  components: {
    Media
  },
  props: {
    value: {
      type: [String, Array, Object]
    },
    item: {
      type: Object,
      required: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    /**
     * 获取配置文件
     */
    requestUrl: {
      type: String,
      default: "/opapi/file/video/create"
    }
  },
  data() {
    let ffmpeg = new Worker("/vendor/webworker/ffmpeg/index.js");
    ffmpeg.onmessage = this.ffmpegMessage;
    return {
      fileList: [],
      ffmpegConfig: {
        visible: false,
        rate: "500k",
        scale: "1280:720",
        scaleOptions: [
          "320:240",
          "640:480",
          "480:272",
          "640:360",
          "672:378",
          "720:480",
          "1024:600",
          "1280:720",
          "1920:1080"
        ]
      },
      ffmpeg,
      cache: "",
      preview: [],
      ffmpegLoaded: false,
      transcoding: false // 是否正在转码
    };
  },
  computed: {
    disabledTranscoding() {
      if (!this.ffmpegLoaded) {
        return true;
      }
      if (this.fileList.every(file => file.status === "success")) {
        return true;
      }
      return false;
    }
  },
  methods: {
    /**
     * 覆写的上传视频
     * 1. 获取上传的地址和成功后的结果
     * 2. 上传
     * 3. 上传成功，返回预定义好的成功结果
     */
    upload() {
      // let cache = null;
      // let { onError, onSuccess, file } = uploadInfo;
      // return axios
      //   .get(this.requestUrl)
      //   .then(res => {
      //     let { params, serverUrl } = res.data
      //     cache = params // 缓存
      //     let form = new FormData()
      //     let { filename, headers, onProgress } = uploadInfo
      //     for (let key in params) {
      //       form.append(key, params[key])
      //     }
      //     form.append(filename, file) // 通过append向form对象添加数据
      //     return axios.post(serverUrl, form, {
      //       headers: Object.assign(
      //         { 'Content-Type': 'multipart/form-data' },
      //         headers
      //       ),
      //       onUploadProgress: onProgress
      //     })
      //   })
      //   .then(onSuccess)
      //   .then(() => {
      //     let targetFile = this.fileList.find(item => item.raw === file)
      //     this.$nextTick(() => {
      //       delete targetFile.raw
      //       targetFile.name = cache.key
      //       targetFile.url = cache.fileUrl
      //       targetFile.poster = cache.posterUrl
      //       targetFile.uploadParams = cache
      //       this.generatePreview(this.fileList)
      //     })
      //   })
      //   .catch(onError)
    },
    /**
     * 处理webworker的
     */
    ffmpegMessage(e) {
      let { type, data, totalTime } = e.data;
      //   console.log(type, data);
      switch (type) {
        case "ready": {
          this.ffmpegLoaded = true;
          break;
        }
        case "done": {
          this.transcoding = false;
          this.$notify({
            type: "success",
            title: "转换完成",
            message: "共耗时: " + totalTime,
            duration: 5000
          });
          this.cache = "";
          // 替换
          data.forEach(({ originName, name, raw }) => {
            let source = this.fileList.find(file => file.name === originName);
            if (!source) {
              return;
            }
            source.name = name;
            source.percentage = 0;
            source.raw = raw;
            source.size = raw.size;
          });
          this.generatePreview(this.fileList);
          break;
        }
        case "start": {
          this.transcoding = true;
          this.$notify({
            type: "info",
            title: "开始转换",
            message: "命令: ffmpeg " + data.join(" "),
            duration: 3000
          });
          break;
        }
        /**
         * 进度一类的处理
         */
        default: {
          // 获取输入名
          if (data.includes("Input #")) {
            this.cache = (/'.*'/g.exec(data) || [""])[0].replace(/'/g, "");
          }
          // 计算总时间
          if (data.includes("Duration:")) {
            let targetFile =
              this.fileList.find(item => item.name === this.cache) || {};
            let duration = (/Duration:.*?,/.exec(data) || ["0:0:0"])[0]
              .replace("Duration:", "")
              .replace(",", "")
              .replace(/\s/g, "");
            let [hour, minute, second] = duration
              .split(":")
              .map(value => Number(value));
            let total = hour * 3600 + minute * 60 + second;
            targetFile.duration = total;
            targetFile.countFrame = total * 24;
            this.cache = targetFile;
          }
          // 获取fps计算总frame
          if (data.includes(" tbc (default)")) {
            let fps = /tbn,.*tbc/
              .exec(data)[0]
              .replace("tbn, ", "")
              .replace(" tbc", "");
            this.cache.countFrame = Number(fps) * this.cache.duration;
          }
          if (data.includes("frame= ")) {
            // 计算百分比
            let frame = (/frame=.*?fps/.exec(data) || ["0"])[0]
              .replace("fps", "")
              .replace("frame=", "")
              .replace(/\s/g, "");
            let percentage = (Number(frame) / this.cache.countFrame) * 100;
            this.cache.percentage = parseInt(percentage);
          }
        }
      }
    },
    changeHandler(file, fileList) {
      this.fileList = fileList.map(file =>
        Object.assign(
          {
            duration: 0,
            poster: ""
          },
          file
        )
      );
    },
    startTranscode() {
      this.ffmpegConfig.visible = false;
      let targetFiles = this.fileList.map(({ name, raw }) => {
        let reader = new FileReader();
        reader.readAsArrayBuffer(raw);
        return new Promise((resolve, reject) => {
          reader.onload = function() {
            resolve({
              name,
              data: new Uint8Array(reader.result)
            });
          };
          reader.onerror = function(e) {
            reject(e);
          };
        });
      });
      /**
       * 转换之后进行转码
       */
      Promise.all(targetFiles)
        .then(files => {
          let argumentsContent =
            files.map(({ name }) => "-i " + name).join(" ") +
            " -vf showinfo -strict -2 -c:v libx264 " +
            `-s ${this.ffmpegConfig.scale} ` +
            `-b:v ${this.ffmpegConfig.rate} ` +
            files.map(({ name }) => name.replace(/\..*$/, ".mp4")).join(" ");
          this.ffmpeg.postMessage({
            type: "command",
            files,
            arguments: argumentsContent.split(" ")
          });
        })
        .catch(e => {
          this.$message.error(e);
        });
    },
    generatePreview: debounce(function(list) {
      this.preview = list.map((item, index) => {
        let url = item.raw ? URL.createObjectURL(item.raw) : item.url;
        if (item.raw) {
          // poster
          let video = document.createElement("video");
          video.src = url;
          video.addEventListener(
            "loadeddata",
            function() {
              let canvas = document.createElement("canvas");
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;
              canvas
                .getContext("2d")
                .drawImage(video, 0, 0, canvas.width, canvas.height);
              this.preview[index].poster = canvas.toDataURL("image/png");
              canvas = null;
              video = null;
            }.bind(this)
          );
        }
        return Object.assign(
          {
            url
          },
          item
        );
      });
    }, 500)
  },
  watch: {
    fileList: {
      deep: false,
      immediate: true,
      handler(list) {
        this.generatePreview(list);
      }
    },
    preview(list = []) {
      let value = list;
      if (!this.multiple) {
        value = value[0];
      }
      this.$emit("input", value);
    }
  },
  beforeDestroy() {
    this.ffmpeg.terminate();
  }
};
</script>
