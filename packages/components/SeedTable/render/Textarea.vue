<!-- @format -->

<template>
  <el-popover
    placement="top-start"
    trigger="hover"
    width="300"
    :disabled="!showClamp"
  >
    <div class="popover" v-html="value"></div>
    <div slot="reference">
      <div :style="{ height: `${line * 1.5}em`, overflow: 'hidden' }">
        <div v-html="value" ref="reference"></div>
      </div>
      <span v-if="showClamp">...</span>
    </div>
  </el-popover>
</template>

<script>
export default {
  props: ["value", "seed"],
  data() {
    return {
      showClamp: false,
      line: 3
    };
  },
  mounted() {
    const { options = {} } = this.seed;
    const { line = 3 } = options;
    this.line = line;
    this.$nextTick(() => {
      const valueContainer = this.$refs.reference;
      if (valueContainer) {
        this.showClamp =
          valueContainer.clientHeight > valueContainer.parentNode.clientHeight;
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
