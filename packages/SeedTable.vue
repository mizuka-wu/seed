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
    },
    deleteItem: {
      type: Function
    }
  },
  computed: {
    tableSeeds({
      seeds,
      $scopedSlots,
      updateItem,
      deleteItem,
      openForm,
      deleteRow
    }) {
      const tableSeeds = optionsHelper(seeds, "table");

      // 判断是否需要增加工具列
      const control = $scopedSlots.control;
      if (control || updateItem || deleteItem) {
        tableSeeds.push({
          key: "_control",
          label: " ",
          render(h, value, column, scope) {
            const row = scope.row;
            return (
              <div class="control-column">
                {updateItem && (
                  <ElButton
                    type="warning"
                    size="small"
                    onClick={() => openForm(row)}
                  >
                    编辑
                  </ElButton>
                )}
                {deleteItem && (
                  <ElPopconfirm
                    confirmButtonText="确定"
                    cancelButtonText="取消"
                    title="您确定删除该记录么？"
                    onOnConfirm={() => deleteRow(row)}
                  >
                    <ElButton type="danger" size="small" slot="reference">
                      删除
                    </ElButton>
                  </ElPopconfirm>
                )}
              </div>
            );
          }
        });
      }

      return tableSeeds;
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
    formVnodeData({ $attrs, $listeners }) {
      return {
        props: $attrs,
        on: $listeners
      };
    }
  },
  methods: {
    openForm(defaultForm) {
      const form = this.$refs.form;
      if (form) {
        form.open(defaultForm);
      } else {
        throw new Error("form生成失败");
      }
    },
    refresh() {
      this.$parent.refresh();
    },
    submit({ form, isAdd } = {}) {
      if (form) {
        const promise = this.$props[isAdd ? "addItem" : "updateItem"](form);
        if (promise instanceof Promise) {
          promise.then(() => this.refresh());
        } else {
          this.$nextTick(() => {
            setTimeout(() => {
              this.refresh();
            }, 500);
          });
        }
      }
    },
    deleteRow(row) {
      const promise = this.deleteItem(row);
      if (promise instanceof Promise) {
        promise.then(() => this.refresh());
      } else {
        this.$nextTick(() => {
          setTimeout(() => {
            this.refresh();
          }, 500);
        });
      }
    }
  },
  // 改用render函数，保证slot的传递
  render() {
    const {
      tableSeeds,
      addItem,
      updateItem,
      seeds,
      formVnodeData,
      tableVnodeData,
      openForm,
      submit
    } = this;

    return (
      <div class="table-container">
        <SeedTable seeds={tableSeeds} {...tableVnodeData}>
          {addItem && (
            <ElButton size="small" type="primary" onClick={() => openForm()}>
              添加
            </ElButton>
          )}
        </SeedTable>
        {(addItem || updateItem) && (
          <SeedForm
            onSubmit={submit}
            seeds={seeds}
            ref="form"
            {...formVnodeData}
          />
        )}
      </div>
    );
  }
};
</script>

<style lang="stylus" scoped>
.table-container
  margin 16px 0
  >>> .control-column
    display inline-flex
    justify-content space-between
    min-width 120px
</style>
