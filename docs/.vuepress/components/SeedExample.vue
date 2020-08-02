<template>
  <ClientOnly>
    <div class="seed-demo" v-loading="loadingSourceCode">
      <div class="control">
        <el-tooltip
          effect="dark"
          :content="isShowSourceCode ? '返回' : '查看源代码'"
          placement="bottom"
        >
          <el-button
            size="large"
            type="text"
            icon="el-icon-document"
            @click="handleShowSourceCode(!isShowSourceCode)"
          />
        </el-tooltip>
        <el-tooltip
          v-if="isShowSourceCode"
          effect="dark"
          content="复制当前代码"
          placement="bottom"
        >
          <el-button
            size="large"
            type="text"
            v-clipboard:copy="sourceCodeRaw"
            v-clipboard:success="handleCopySourceCode"
            icon="el-icon-copy-document"
          />
        </el-tooltip>
        <el-tooltip
          effect="dark"
          :content="isFullscreen ? '退出全屏' : '全屏'"
          placement="bottom"
        >
          <el-button
            size="large"
            type="text"
            icon="el-icon-full-screen"
            @click="handleFullscreen"
          />
        </el-tooltip>
      </div>
      <div v-if="isShowSourceCode" class="source-code">
        <div class="language-vue extra-class">
          <pre
            class="language-vue"
          ><code ref="code" v-html="sourceCode" /></pre>
        </div>
      </div>
      <component
        :is="isFullscreen ? 'el-dialog' : 'div'"
        :visible.sync="isFullscreen"
        fullscreen
        v-else
      >
        <App :example="example" />
      </component>
    </div>
  </ClientOnly>
</template>

<script>
import App from "@/examples/App";
import resource from "@/examples/mock/resource";
import prism from "prismjs";

export default {
  components: {
    App
  },
  props: {
    example: {
      type: String
    }
  },
  data() {
    return {
      isFullscreen: false,
      isShowSourceCode: false,
      sourceCode: "",
      sourceCodeRaw: "",
      loadingSourceCode: false
    };
  },
  methods: {
    handleFullscreen() {
      this.isFullscreen = !this.isFullscreen;
    },
    handleShowSourceCode(e) {
      const vm = this;
      if (e) {
        vm.loadingSourceCode = true;
        fetch(
          `https://cdn.jsdelivr.net/gh/mizuka-wu/seed/examples/${this.example}.vue`
        )
          .then(function(response) {
            return response.text();
          })
          .then(function(raw) {
            vm.sourceCodeRaw = raw;
            vm.sourceCode = prism.highlight(raw, prism.languages.markup, "vue");
            vm.isShowSourceCode = true;
            vm.loadingSourceCode = false;
          })
          .catch(e => {
            console.error(e);
            vm.loadingSourceCode = false;
          });
      } else {
        vm.sourceCode = "";
        vm.isShowSourceCode = e;
      }
    },
    handleCopySourceCode() {
      this.$message.success("复制成功！");
    }
  }
};
</script>
<style lang="stylus">
// 修复组件内因为外部主题导致的样式问题
.seed-demo
  border 1px solid #ddd
  border-radius 4px
  max-height 900px
  overflow scroll
  .control
    padding 0 10px
    display flex
    flex-direction row-reverse
    margin-bottom -10px
  .source-code
    padding 10px
  table
    margin initial
  th, td
    border initial
</style>