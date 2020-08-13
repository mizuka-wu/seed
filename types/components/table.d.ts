import Vue from "vue";
import { Seed } from "../seed";

declare class SeedTable extends Vue {
  /** seed */
  seeds: Seed[];

  /** 数据 */
  data: Object[];

  /** 是否可拖拽排序 */
  sortable?: boolean;

  /** 表头默认吸顶 */
  stickyHead?: boolean;

  /** 行标题 */
  rowKey?: string;

}

export default SeedTable;
