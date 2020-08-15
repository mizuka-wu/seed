/* eslint-disable no-unused-vars */
import { VNode } from "vue/types/vnode.d.ts";
import { CreateElement } from "vue";
import { TableColumn } from "element-ui/types/table-column";

export interface FormRenderContext {
  props: {
    value: any;
    seed: Seed;
    model: Object;
    $index: number;
  };
  on: {
    /**
     * 自动更新form对应数据的方法
     */
    input: Function;
  };
}

export interface TableRenderContext {
  props: {
    value: any;
    seed: Seed;
    row: Object;
    $index: number;
    column: TableColumn;
  };
}

export function render(
  h: CreateElement,
  context: FormRenderContext | TableRenderContext
): VNode | string {}

export function showCondition<T = Object>(model: T): boolean

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
  show?: boolean | typeof showCondition;
  render?: string | typeof render;
  options?: SeedOptions;
}
