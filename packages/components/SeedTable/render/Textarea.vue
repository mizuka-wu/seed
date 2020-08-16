<!-- @format -->

<template>
  <el-popover
    placement="top-start"
    trigger="hover"
    :width="popoverWidth"
    :disabled="!showClamp || isLargeContext"
  >
    <div class="popover" v-html="value"></div>
    <div slot="reference">
      <div :style="{ height: `${line * 1.5}em`, overflow: 'hidden' }">
        <div v-html="value" ref="reference"></div>
      </div>
      <!-- <div v-if="showClamp">
        ...
        <template v-if="isLargeContext">
          <el-dialog
            width="80%"
            v-if="isLargeContext"
            :visible.sync="isShowDetail"
          >
            <div v-html="value"></div>
          </el-dialog>
          <el-button
            style="float: right;"
            type="text"
            @click="isShowDetail = true"
            >查看详情</el-button
          >
        </template>
      </div> -->
    </div>
  </el-popover>
</template>

<script>
export default {
  props: ["value", "seed"],
  data() {
    return {
      popoverWidth: 300,
      showClamp: false,
      line: 3,
      isShowDetail: false,
      isLargeContext: false
    };
  },
  methods: {},
  mounted() {
    const { options = {} } = this.seed;
    const { line = 3 } = options;
    this.line = line;
    this.$nextTick(() => {
      const valueContainer = this.$refs.reference;
      if (valueContainer) {
        // 大于容器则显示...
        this.showClamp =
          valueContainer.clientHeight > valueContainer.parentNode.clientHeight;

        // // 判断是否是超大文本, 大于70%的页面高度
        // this.isLargeContext =
        //   valueContainer.clientHeight > document.body.offsetHeight * 0.7;
      }
    });
  }
};
</script>
<style scoped>
.popover {
  max-height: 400px;
  overflow: auto;
}
</style>
