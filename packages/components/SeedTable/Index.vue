<template>
  <div :class="{ 'sticky-head': stickyHead }">
    <!-- 控制栏 -->
    <div class="control-container">
      <div>
        <slot v-if="isShowBatchList" :rows="selectedRows" name="batchList" />
      </div>
      <div>
        <slot />
      </div>
    </div>
    <el-table
      ref="table"
      :data="data"
      :row-key="rowKey"
      @selection-change="onSelectionChange"
    >
      <!-- 批量选择 -->
      <el-table-column v-if="isShowBatchList" type="selection" />
      <!-- 正常渲染 -->
      <el-table-column
        v-for="column of columns"
        :key="column.key"
        :label="column.label || column.key"
      >
        <Render slot-scope="scope" :column="column" :scope="scope" />
      </el-table-column>
      <!-- sortable控制 -->
      <el-table-column v-if="sortable" width="50">
        <template slot-scope="{ $index }">
          <div
            v-for="{ icon, target, isShow } of sortControls"
            :key="icon"
            style="padding: 5px"
          >
            <el-button
              circle
              :icon="icon"
              size="mini"
              v-if="isShow($index)"
              @click="exchangeRow($index, target($index), true)"
            />
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="isShowBatchList" class="batch-control">
      <el-checkbox
        style="margin-right: 15px;"
        :indeterminate="isIndeterminate"
        v-model="isCheckAll"
        >{{ isCheckAll ? "取消" : "全选" }}
      </el-checkbox>
      <slot :rows="selectedRows" name="batchList"></slot>
    </div>
  </div>
</template>
<script>
import Render from "./render/Index.vue";
import Sortable from "sortablejs";

const TIME = 500;

export default {
  components: {
    Render
  },
  name: "SeedTable",
  props: {
    data: {
      type: Array,
      required: true
    },
    rowKey: {
      type: String,
      default: "_key"
    },
    seeds: {
      type: Array,
      required: true
    },
    sortable: {
      type: Boolean,
      default: false
    },
    stickyHead: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      selectedRows: []
    };
  },
  computed: {
    columns() {
      return this.seeds;
    },
    sortControls({ data }) {
      return [
        // 置顶
        {
          icon: "el-icon-upload2",
          target: () => 0,
          isShow: index => index !== 0
        },
        // 向上
        {
          icon: "el-icon-caret-top",
          target: index => index - 1,
          isShow: index => index !== 0
        },
        {
          icon: "el-icon-caret-bottom",
          target: index => index + 1,
          isShow: index => index < data.length
        }
      ];
    },
    isShowBatchList() {
      return !!this.$scopedSlots.batchList;
    },
    isIndeterminate() {
      if (this.selectedRows.length === 0 || this.isCheckAll) {
        return false;
      }
      return true;
    },
    isCheckAll: {
      get() {
        return this.selectedRows.length === this.data.length;
      },
      /**
       * @param {boolean} vlaue - 是否全选
       */
      set(value) {
        let table = this.$refs.table;
        // 全选就是清除之后再全部切换
        if (table) {
          table.clearSelection();
          if (value) {
            table.toggleAllSelection();
          }
        } else {
          this.$message({
            type: "error",
            message: "无法初始化table"
          });
        }
      }
    }
  },
  methods: {
    onSelectionChange(val) {
      this.selectedRows = val;
      this.selectionChange && this.selectionChange(val);
    },
    // 以下是交换行相关的操作
    /**
     * 模拟的效果
     */
    mockExchange(index, targetIndex) {
      if (!this.sortable) {
        return;
      }
      let rows = this.$el.querySelectorAll(".el-table__row");
      let orientation = index > targetIndex ? 1 : -1; // 方向参数 1 为向上 -1 为向下
      let offset = orientation * rows[index].offsetHeight; // 单次位移的距离

      // rows增加补间动画
      rows.forEach(row => {
        row.style.transition = `transform ${TIME}ms`;
      });

      // 生成受影响的index
      let effectedRows = [index, targetIndex].sort(function(i, j) {
        return i > j ? 1 : -1;
      });
      // 最大最小 然后补全中间的函数
      let [min, max] = effectedRows;
      for (let effectedIndex = min + 1; effectedIndex < max; effectedIndex++) {
        effectedRows.push(effectedIndex);
      }

      // 排除掉index本身并排序(这玩意比较特殊)转为row的列表
      effectedRows = effectedRows
        .filter(effectedIndex => effectedIndex !== index)
        .sort(function(i, j) {
          return i > j ? 1 : -1;
        })
        .map(index => rows[index]);

      let effectedRowOffset = `${offset}px`;
      effectedRows.forEach(row => {
        row.style.transform = `translateY(${effectedRowOffset})`;
      });

      // 主体的动画部分 动画结束之后再刷新页面
      let originRow = rows[index];

      // 移动那些受影响的行的高度
      let originRowOffset = effectedRows.reduce(
        (total, row) => (total += row.offsetHeight),
        0
      );
      originRow.style.transform = `translateY(${orientation *
        -1 *
        originRowOffset}px)`;
      originRow.style.zIndex = 9999;
      originRow.style.boxShadow = "2px 2px 5px #eeeeee";
      setTimeout(() => {
        originRow.style.zIndex = "";
        originRow.style.boxShadow = "";
        this.exchangeRow(index, targetIndex, false);
      }, TIME);
    },
    /**
     * 交换行
     * @param {number} index - 原来的index
     * @param {number} targetIndex - 目标的index
     * @param {boolean} mock - 是否模拟排序？只放出动画
     */
    exchangeRow(index, targetIndex, mock = false) {
      if (!this.sortable) {
        return;
      }
      // 一些不能交换的状态
      if (targetIndex < 0) {
        return;
      }
      if (index === targetIndex) {
        return;
      }
      if (targetIndex > this.data.length) {
        return;
      }

      // 如果是mock 模拟交换动画
      if (mock) {
        this.mockExchange(index, targetIndex);
      } else {
        let array = this.data;
        let target = array[index];

        let rows = this.$el.querySelectorAll(".el-table__row");
        rows.forEach(row => {
          row.style.transition = "";
          row.style.transform = "";
        });

        const toAfter = targetIndex > index;
        // 插入
        this.data.splice(toAfter ? targetIndex + 1 : targetIndex, 0, target);
        // 删除(插入到之前的话，原始index 需要 + 1)
        this.data.splice(toAfter ? index : index + 1, 1);
        this.$emit("exchange", array);
      }
    }
  },
  watch: {
    data(data) {
      const key = this.rowKey;
      const keys = data.map(row => row[key]);
      this.selectedRows = this.selectedRows.filter(row =>
        keys.includes(row[key])
      );
    }
  },
  mounted() {
    if (this.sortable) {
      let that = this;

      let el = this.$el.querySelector(".el-table tbody");
      Sortable.create(el, {
        delay: 300,
        onEnd({ oldIndex, newIndex }) {
          that.exchangeRow(oldIndex, newIndex);
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.control-container
  display flex
  justify-content space-between
.batch-control
  display flex
  margin 10px 0
  align-items center
.sticky-head
  >>>.el-table
    overflow visible
    .el-table__header-wrapper
      overflow visible
      position sticky
      top 0
      z-index 10
  >>>table
    position sticky
    top 0
    thead
      position relative
      th
        position sticky
        top 0
        z-index 10
</style>
