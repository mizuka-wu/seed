<!-- @format -->

<template>
  <div>
    <!-- 图片小图 -->
    <div class="images-container">
      <!-- 图片的问题，需要包裹一下 -->
      <div
        @click="preview(index)"
        :class="[media.type]"
        v-for="(media, index) of lazyMedias"
        :key="'img-' + index"
      >
        <div class="placeholder">
          <i class="el-icon-loading" />
        </div>
        <el-badge :value="getSize(media.size)" :hidden="!media.size > 0">
          <div
            class="image"
            :style="{ backgroundImage: 'url(' + media.thumbnail + ')' }"
          ></div>
        </el-badge>
      </div>
    </div>
    <!-- 弹窗 -->
    <el-dialog
      fullscreen
      :modal="false"
      append-to-body
      @mousewheel.native.prevent
      custom-class="media-model"
      :visible.sync="dialogTableVisible"
    >
      <!-- 原始大小等的工具栏 -->
      <div class="toolbox">
        <el-button
          @click="zoomIn = !zoomIn"
          type="text"
          :icon="zoomIn ? 'el-icon-zoom-out' : 'el-icon-zoom-in'"
        ></el-button>
      </div>
      <el-carousel
        v-if="dialogTableVisible"
        class="previewer"
        :autoplay="false"
        :initial-index="target"
        height="100%"
        :indicator-position="medias.length > 1 ? '' : 'none'"
        :arrow="medias.length > 1 ? 'hover' : 'never'"
        ref="carousel"
        @click.native.stop="carouselClickHandler"
      >
        <el-carousel-item
          v-for="(media, index) in lazyMedias"
          :key="'carousel-' + index"
        >
          <components
            v-if="media.url"
            class="carousel-media"
            ref="carousel-media"
            @mousewheel="mousewheelHandler"
            :style="{
              transform: 'translateY(0px)',
              maxHeight: zoomIn && media.type === 'img' ? 'initial' : undefined
            }"
            :is="media.type"
            controls="controls"
            :src="media.url"
          ></components>
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
  </div>
</template>

<script>
/**
 * 图片/视频预览装置
 * 因为无法使用functional 所以性能会有损失
 * @format
 */

import prettyBytes from "pretty-bytes";
import throttle from "lodash-es/throttle";

/**
 * 考虑兼容问题，暂时不使用
 */
export default {
  name: "MediaPreview",
  props: {
    seed: {
      type: Object,
      required: true
    },
    value: {
      type: [Object, Array, String]
    }
  },
  data() {
    return {
      dialogTableVisible: false,
      target: 0,
      container: null,
      isInScreen: false,
      zoomIn: false,
      intersectionObserver: null
    };
  },
  computed: {
    noLazy() {
      return (this.seed.options || {}).noLazy;
    },
    /**
     * 显示的数据
     * @param url
     * @param {string} thumbnail - 缩略图
     * @param {enum: ["img", "video"]} type
     */
    medias() {
      let data = this.value || [];
      data = Array.isArray(data) ? data : [data];
      return data
        .filter(item => item)
        .map(item => {
          let url = "";
          let type = "";
          let size = 0;
          let thumbnail = "";

          if (typeof item === "string") {
            url = item;
            type = this.getType(url);
            thumbnail = item;
          } else if (typeof item === "object") {
            url = item.url;
            type = this.getType(item.url);
            thumbnail = item.thumbnail;
            if (!thumbnail && type === "img") {
              thumbnail = item.url;
            }
            size = item.size;
          }

          return {
            url,
            thumbnail,
            type,
            size
          };
        })
        .filter(item => item.type);
    },
    lazyMedias() {
      if (this.noLazy || this.isInScreen) {
        return this.medias;
      } else {
        return this.medias.map(item => ({
          type: item.type,
          thumbnail: `https://dummyimage.com/300/&text=${location.hostname}`
        }));
      }
    }
  },
  methods: {
    /**
     * 预览
     */
    preview(index) {
      this.target = index;
      this.dialogTableVisible = true;
    },
    // 跑马灯是否关闭判断
    carouselClickHandler({ target }) {
      if (target.className.includes("el-carousel__item")) {
        this.dialogTableVisible = false;
      }
    },
    mousewheelHandler: throttle(function(e) {
      if (this.zoomIn && e.target.nodeName === "IMG") {
        let { target, deltaY } = e;
        let parent = target.parentNode;

        // 最多可以的移动距离
        let max = Math.max(0, (target.clientHeight - parent.clientHeight) / 2);

        let translateY = target.style.transform.match(/translateY\((.*?)\)/);
        translateY = Number(
          (translateY ? translateY[1] : "0px").replace("px", "")
        ); // 转数字
        let delta = translateY - deltaY;
        delta = delta > 0 ? Math.min(delta, max) : Math.max(delta, -1 * max); // 不能超过边界值
        translateY = `translateY(${delta}px)`;
        let transform = target.style.transform;
        if (transform.includes("translateY")) {
          transform = transform.replace(/translateY\((.*?)\)/, translateY);
        } else {
          transform += " " + translateY;
        }
        target.style.transform = transform;
        target = null;
        parent = null;
      }
    }, 10),
    getSize(size = 0) {
      return prettyBytes(size);
    },
    getType(url = "") {
      // 确定用img解析
      if (/\w+\\.(bmp|jpg|png|tif|gif|pcx|tga|exif|fpx|svg|webp)/.test(url)) {
        return "img";
      } else if (/\w+\\.(mp4|mov)/.test(url)) {
        return "video";
      }
      console.warn(url, "无法明确确定类型");
      return "img"; // 默认用img解析
    },
    observerCallback(entries) {
      if (entries[0]) {
        this.isInScreen = entries[0].isIntersecting;
        if (this.isInScreen) {
          this.intersectionObserver.disconnect();
        }
      }
    }
  },
  watch: {
    /**
     * 自动初始化回中间
     */
    zoomIn() {
      if (this.$refs["carousel-media"]) {
        this.$refs["carousel-media"].forEach(
          node => (node.style.transform = "")
        );
      }
    }
  },
  mounted() {
    if (!this.noLazy && window.IntersectionObserver) {
      this.intersectionObserver = new IntersectionObserver(
        this.observerCallback.bind(this)
      );
      this.intersectionObserver.observe(document.body);
    } else {
      this.isInScreen = true;

      if (!window.IntersectionObserver) {
        console.warn("IntersectionObserver", "不支持");
      }
    }
  },
  activated() {
    if (this.intersectionObserver) {
      this.intersectionObserver.observe();
    }
  },
  deactivated() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  },
  beforeDestroy() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      this.intersectionObserver = null;
    }
  }
};
</script>

<style lang="less">
/** @format */

.media-model {
  background: rgba(0, 0, 0, 0.75);

  .el-dialog__header {
    display: none;
  }

  .el-dialog__body {
    height: 100%;

    .toolbox {
      position: absolute;
      right: 15px;
      top: 5px;

      i {
        color: #eeeeee;
        font-size: 22px;
      }
    }

    .previewer {
      height: 100%;

      .carousel-media {
        background: #ffffff;
        max-width: 50%;
        max-height: 75%;
        position: absolute;
        right: 0;
        left: 0;
        top: 0;
        bottom: 0;
        margin: auto;
      }
    }
  }
}

.images-container {
  display: inline-flex;
  flex-wrap: wrap;

  img {
    position: relative;
  }

  .el-badge__content {
    z-index: 9999;
  }

  .video,
  .img {
    margin: 5px;
    position: relative;

    .placeholder {
      z-index: 1;
      position: absolute;
      width: 100%;
      top: 0;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      i {
        color: #000000;
        font-size: 32px;
      }
    }

    .image {
      width: 100px;
      height: 100px;
      z-index: 2;
      position: relative;
      background-size: cover;
      background-position: center;
    }
  }

  .video {
    position: relative;

    &:after {
      content: " ";
      width: 0;
      height: 0;
      position: absolute;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      border-right: 10px solid transparent;
      border-left: 20px solid #ffffff;
      right: 0;
      top: 0;
      bottom: 0;
      left: 10px;
      margin: auto;
      display: block;
      z-index: 999;
    }
  }
}
</style>
