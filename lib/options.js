/**
 * 将对应类型的options取出，然后生成对应的seed
 * @param { import('../types/lib/options').Seeds } seeds
 * @param { import('../types/lib/options').OptionsKey } key
 * @returns { import('../types/lib/options').Seeds }
 */
export default function(seeds = [], key) {
  if (!key) {
    return seeds;
  }

  const _seeds = seeds
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

  const keys = _seeds.map(seed => seed.key);

  if (keys.some(key => typeof key !== "string")) {
    throw new Error("Seed定义错误，请检查key");
  }

  if (Array.from(new Set(keys)).length !== keys.length) {
    throw new Error("Seed中的key重复");
  }

  return _seeds;
}
