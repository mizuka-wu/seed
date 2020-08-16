<script>
export default {
  props: {
    form: {
      type: Object,
      required: false
    },
    rules: {
      type: Object,
      required: true
    }
  },
  render(h) {
    return h("div");
  }
};
</script>
