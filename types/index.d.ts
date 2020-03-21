import { VNode } from "vue/types/vnode.d.ts";
import { CreateElement } from "vue/types/vue.d.ts";
export function render(h: CreateElement): any {}

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
