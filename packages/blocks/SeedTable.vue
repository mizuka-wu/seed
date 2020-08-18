<script>
import SeedTable from "seed-toolkit/packages/components/SeedTable/Index.vue";
import SeedForm from "./SeedForm.vue";
import optionsHelper from "seed-toolkit/lib/options";
import { Message } from "element-ui";

const injectErrorCatch = function(promise) {
  promise.catch(e => {
    Message.error(e.message);
  });
};

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
    },
    controlColumnOptions: {
      type: Object
    }
  },
  computed: {
    tableSeeds({
      seeds,
      $parent,
      updateItem,
      deleteItem,
      openForm,
      deleteRow
    }) {
      const tableSeeds = optionsHelper(seeds, "table");

      // 判断是否需要增加工具列
      const scopeControl = $parent.$scopedSlots.control;
      if (scopeControl || updateItem || deleteItem) {
        tableSeeds.push({
          key: "_control",
          label: "操作",
          options: this.controlColumnOptions || {},
          render(h, context) {
            const { props, model } = context;
            return (
              <div class="control-column">
                {scopeControl && scopeControl(props.scope)}
                {updateItem && (
                  <ElButton
                    class="control-button"
                    type="warning"
                    size="small"
                    onClick={() => openForm(model)}
                  >
                    编辑
                  </ElButton>
                )}
                {deleteItem && (
                  <ElPopconfirm
                    class="control-button"
                    confirmButtonText="确定"
                    cancelButtonText="取消"
                    title="您确定删除该记录么？"
                    onOnConfirm={() => deleteRow(model)}
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
    tableVnodeData({ $attrs, $listeners, $parent, openForm, addItem, $slots }) {
      const { batchList, blogRender } = $parent.$scopedSlots;
      const { tools } = $parent.$slots;

      return {
        props: $attrs,
        on: $listeners,
        scopedSlots: {
          batchList,
          blogRender,
          default: () => {
            return (
              <div>
                {
                  // slot的工具栏,混合了template和更外层的模版的slot
                  (tools, $slots.tools)
                }
                {// 添加按钮
                addItem && (
                  <ElButton
                    size="small"
                    type="primary"
                    onClick={() => openForm()}
                  >
                    添加
                  </ElButton>
                )}
              </div>
            );
          }
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
          injectErrorCatch(promise.then(() => this.refresh()));
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
        injectErrorCatch(promise.then(() => this.refresh()));
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
      submit
    } = this;

    return (
      <div class="table-container">
        <SeedTable seeds={tableSeeds} {...tableVnodeData} />
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
   .control-button + .control-button
    margin-left 8px
</style>
