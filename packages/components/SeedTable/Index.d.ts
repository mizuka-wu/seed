import Vue from "vue";
import { Seed } from "types/index";
export declare class SeedTable<T = any> extends Vue {
  /** seed配置 */
  seeds: Seed[];

  /** 数据 */
  data: T[];

  /** 是否可拖拽排序 */
  sortable?: boolean;

  /** 表头默认吸顶 */
  stickyHead?: boolean;

  /** 行标题 */
  rowKey?: string;
}

export default SeedTable;
