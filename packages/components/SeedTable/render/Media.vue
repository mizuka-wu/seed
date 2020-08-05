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
 *
 * @format
 */

import throttle from "lodash/throttle";
import prettyBytes from "pretty-bytes";

export default {
  name: "MediaPreview",
  props: {
    data: {
      type: [Object, Array, String]
    },
    noLazy: {
      type: Boolean,
      default: false
    }
  },
  inject: {
    seed: {
      default() {
        return {
          container: window
        };
      }
    }
  },
  data() {
    let that = this;
    return {
      dialogTableVisible: false,
      target: 0,
      isInScreen: false,
      lazyScrollHandler: throttle(function() {
        let container = that.seed.container;
        let scrollTop = container.documentElement
          ? container.documentElement.scrollTop || container.body.scrollTop
          : container.scrollTop;
        let containerHeight =
          container.clientHeight || container.documentElement.clientHeight;
        let toTop = 0; // 距离顶部的距离
        let elm = that.$el;
        while (elm.offsetParent) {
          toTop += elm.offsetTop;
          elm = elm.offsetParent;
        }
        if (scrollTop < toTop && scrollTop + containerHeight > toTop) {
          that.isInScreen = true;
          container.removeEventListener("scroll", that.lazyScrollHandler, true);
        }
        elm = null;
        container = null;
      }, 1000),
      zoomIn: false
    };
  },
  computed: {
    /**
     * 显示的数据
     * @param url
     * @param {string} thumbnail - 缩略图
     * @param {enum: ["img", "video"]} type
     */
    medias() {
      let data = this.data || [];
      data = Array.isArray(data) ? data : [data];
      return data
        .filter(item => item)
        .map(item => {
          let type = "img";
          let url = item;
          let thumbnail = item;
          let size = 0;
          // 这里是视频的判断条件
          if (item.poster) {
            thumbnail = item.poster;
            url = item.url;
            type = "video";
            size = item.size;
          } else if (item.format) {
            /**
             * @todo 通过format进行图片类型判断
             */
            thumbnail = item.url;
            url = item.url;
            type = "img";
          }
          const result = {
            loading: true,
            url,
            thumbnail,
            type,
            size
          };
          return result;
        });
    },
    lazyMedias() {
      if (this.isInScreen || this.noLazy) {
        return this.medias;
      } else {
        return this.medias.map(item => ({
          loading: true,
          type: item.type,
          thumbnail: "https://static.piaoniu.com/pc/ui/img/default-poster.png"
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
    if (!this.noLazy) {
      this.seed.container.addEventListener(
        "scroll",
        this.lazyScrollHandler,
        true
      );
      this.lazyScrollHandler();
    }
  },
  activated() {
    if (!this.noLazy) {
      this.seed.container.addEventListener(
        "scroll",
        this.lazyScrollHandler,
        true
      );
    }
  },
  deactivated() {
    this.seed.container.removeEventListener(
      "scroll",
      this.lazyScrollHandler,
      true
    );
  },
  beforeDestroy() {
    this.seed.container.removeEventListener(
      "scroll",
      this.lazyScrollHandler,
      true
    );
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
      position: absolute;
      width: 100%;
      top: 0;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      i {
        color: #ffffff;
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
