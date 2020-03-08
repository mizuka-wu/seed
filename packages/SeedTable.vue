<script>
import SeedTable from "./components/SeedTable/Index.vue";
import optionsHelper from "./lib/options";
export default {
  components: {
    SeedTable
  },
  name: "SeedTableContainer",
  props: {
    seeds: {
      type: Array,
      required: true
    }
  },
  computed: {
    tableSeeds({ seeds }) {
      return optionsHelper(seeds, "table");
    }
  },
  // 改用render函数，保证slot的传递
  render() {
    const { tableSeeds, $attrs, $listeners } = this;
    const batchList = this.$parent.$scopedSlots.batchList;

    const data = {
      props: $attrs,
      on: $listeners,
      scopedSlots: {
        batchList
      }
    };

    return (
      <SeedTable class="table-container" seeds={tableSeeds} {...data}>
        <ElButton size="mini" type="primary">
          添加
        </ElButton>
      </SeedTable>
    );
  }
};
</script>

<style lang="less" scoped>
.table-container {
  margin: 16px 0;
}
</style>
