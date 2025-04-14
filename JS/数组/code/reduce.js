/**
 * reduce 的基本用法
 */
/**
 * 应用1：求数组对象中值的总和
 */

/**
 * 应用2：统计数组中值的出现次数
 */
const names = ["Alice", "Bob", "Tiff", "Bruce", "Alice"];
const conuntedNames = names.reduce((allNames, cur) => {
  const count = allNames[cur] ? allNames[cur] : 0  // TODO:是否可换成 ?? 
  return {
    ...allNames,
    [cur]: count + 1
  }
}, {})
console.log(conuntedNames)
