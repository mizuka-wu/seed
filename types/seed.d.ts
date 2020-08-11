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
