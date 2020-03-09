<script>
import SeedTable from "./components/SeedTable/Index.vue";
import SeedForm from "./SeedForm.vue";
import optionsHelper from "./lib/options";
export default {
  components: {
    SeedTable,
    SeedForm
  },
  name: "SeedTableContainer",
  props: {
    seeds: {
      type: Array,
      required: true
    },
    addItem: {
      type: Function
    },
    updateItem: {
      type: Function
    }
  },
  data() {
    return {
      showForm: false
    };
  },
  computed: {
    tableSeeds({ seeds }) {
      return optionsHelper(seeds, "table");
    },
    // 给table用的渲染data
    tableVnodeData({ $attrs, $listeners, $parent }) {
      const batchList = $parent.$scopedSlots.batchList;
      return {
        props: $attrs,
        on: $listeners,
        scopedSlots: {
          batchList
        }
      };
    },
    // 给form用的基础渲染data
    formVnodeData({ $attrs, $listeners, $data }) {
      return {
        props: $attrs,
        on: {
          ...$listeners,
          "update:visible": e => ($data.showForm = e)
        }
      };
    }
  },
  // 改用render函数，保证slot的传递
  render() {
    const {
      tableSeeds,
      addItem,
      updateItem,
      showForm,
      seeds,
      formVnodeData,
      tableVnodeData,
      $data
    } = this;

    return (
      <div class="table-container">
        <SeedTable seeds={tableSeeds} {...tableVnodeData}>
          {addItem && (
            <ElButton
              size="mini"
              type="primary"
              onClick={() => ($data.showForm = true)}
            >
              添加
            </ElButton>
          )}
        </SeedTable>
        {(addItem || updateItem) && (
          <SeedForm
            seeds={seeds}
            ref="form"
            visible={showForm}
            {...formVnodeData}
          />
        )}
      </div>
    );
  }
};
</script>

<style lang="less" scoped>
.table-container {
  margin: 16px 0;
}
</style>
