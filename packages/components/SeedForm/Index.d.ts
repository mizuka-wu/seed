import Vue from "vue";
import { Seed } from "types/index";
export declare class SeedForm extends Vue {
  /** seed配置 */
  seeds: Seed[];

  /** 是否inline-form */
  inline?: boolean;

  /** 默认表单内容 */
  defaultForm?: Object;
}

export default SeedForm;
