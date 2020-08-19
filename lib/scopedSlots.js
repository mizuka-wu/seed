export default function(scopedSlots, targetScopeName = "") {
  if (!scopedSlots) {
    return {};
  }
  const keys = Object.keys(scopedSlots);
  const targetKeys = keys.filter(key => {
    const [scopeName] = key.split(":");
    return scopeName === targetScopeName;
  });
  return Object.fromEntries(
    Object.entries(scopedSlots)
      .filter(([key]) => targetKeys.includes(key))
      .map(([key, value]) => [key.replace(`${targetScopeName}:`, ""), value])
  );
}
