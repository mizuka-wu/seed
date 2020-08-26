<template>
  <div id="app">
    <template v-if="!example">
      <el-radio
        v-for="exampleName of examples"
        :key="exampleName"
        :label="exampleName"
        v-model="currentExample"
        >{{ exampleName }}</el-radio
      >
    </template>
    <component v-if="currentExample" :is="currentExample" />
  </div>
</template>

<script>
const exampleContext = require.context("./", false, /\.vue/);
const Examples = exampleContext
  .keys()
  .filter(item => item !== "./App.vue")
  .reduce((_examples, example) => {
    const component = exampleContext(example).default;
    const componentName = example.replace(/\.\/(.*)\.vue/, "$1");
    _examples[componentName] = component;
    return _examples;
  }, {});

export default {
  name: "app",
  components: {
    ...Examples
  },
  props: {
    example: {
      type: String
    }
  },
  data() {
    const examples = Object.keys(Examples);
    const currentExample = examples.includes(this.example)
      ? this.example
      : examples[0];
    return {
      currentExample,
      examples: Object.keys(Examples)
    };
  }
};
</script>
