<template>
  <div id="app">
    <component v-if="currentExample" :is="currentExample" />
  </div>
</template>

<script>
import qs from "qs";
const exampleContext = require.context("./", false, /\.vue/);
const Examples = exampleContext
  .keys()
  .filter(item => item !== "./App.vue")
  .reduce((_examples, example) => {
    const component = exampleContext(example);
    const componentName = example.replace(/\.\/(.*)\.vue/, "$1");
    return (_examples[componentName] = component);
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
    return {
      examples: Object.keys(Examples)
    };
  },
  computed: {
    currentExample({ example, examples }) {
      const query = qs.parse((location.search || "").replace(/^\?/, ""));

      example = example || query.example;

      if (examples.includes(example)) {
        return example;
      } else {
        return examples[0];
      }
    }
  }
};
</script>
