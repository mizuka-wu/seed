/* eslint-disable no-unused-vars */
import { VNode } from "vue/types/vnode.d.ts";
import { CreateElement } from "vue";
import { TableColumn } from "element-ui/types/table-column";

export interface FormRenderContext<T = Object> {
  props: {
    value: any;
    seed: Seed;
    model: T;
    index: number;
  };
  on: {
    /**
     * 自动更新form对应数据的方法
     */
    input: (value: any, key: [string]) => void;
  };
}

export interface TableRenderContext<T = Object> {
  props: {
    value: any;
    seed: Seed;
    model: T;
    index: number;
    scope: {
      row: T;
      $index: number;
      column: TableColumn;
    };
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
