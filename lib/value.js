/**
 * 这里有一个自动判断是否是多级的方法，并取值的方法
 * @param {*} form
 * @param {*} seed
 */
import Immutable from "immutable";
export default function(form, seed) {
  let key = seed.key || "";
  const isImmutable = Immutable.isImmutable(form);
  let value = isImmutable ? form.get(key) : form[key];
  if (!value && key.includes(".")) {
    let keys = key.split(".");
    /**
     * @todo 判断immutable是否能行
     */
    value = keys.reduce(
      (data, key) => (typeof data[key] === "undefined" ? {} : data[key]),
      form
    );
    return JSON.stringify(value) === "{}" ? undefined : value;
  }
  return value;
}
