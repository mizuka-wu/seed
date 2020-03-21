import { VNode } from "vue/types/vnode.d.ts";
import Vue, { CreateElement } from "vue";

export function render(
  h: CreateElement,
  value: any,
  scope: any,
  seed: Seed
): any {}

export interface SeedOptions {
  excel?: SeedOptions;
  table?: SeedOptions;
  filter?: SeedOptions;
  form?: SeedOptions;
  update?: SeedOptions;
  add?: SeedOptions;
  [key: string]: any;
}
export interface Seed {
  key: string;
  label?: string;
  show?: boolean;
  render?: string | render;
  options?: SeedOptions;
}

export interface SeedContainer extends Vue {
  /** seeds */
  seeds: Seed[];

  /** 是否默认不获取数据 */
  lazy?: boolean;

  /** 每个数据的默认值 */
  rowKey?: string;

  /** 其余的触发重获取数据的监听对象 */
  extraParams?: Object;

  /** 获取数据的方法 */
  featchList: (params: Object) => Promise;

  /** 添加数据的方法 */
  addItem: (form: Object) => Promise;

  /** 更新数据的方法 */
  updateItem: (form: Object) => Promise;

  /** 删除数据的方法 */
  deleteItem: (row: Object) => Promise;
}
