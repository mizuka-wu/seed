/**
 * 将对应类型的options取出，然后生成对应的seed
 * @param {seed} seeds - seed列表
 * @param {string} key - 取出的key
 */
export default function(seeds = [], key) {
  if (!key) {
    return seeds;
  }
  return seeds
    .map(({ options = {}, ...seed }) => {
      if (Array.isArray(options)) {
        throw new Error("处理options失败, 请检查是否传入了array");
      }

      const customerSeed = options[key] || {}; // 覆盖的配置
      delete options[key];
      return {
        ...seed,
        ...customerSeed,
        options: {
          ...options,
          ...(Array.isArray(customerSeed.options) ? {} : customerSeed.options)
        }
      };
    })
    .filter(({ show = true }) => show);
}
