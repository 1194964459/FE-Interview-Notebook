/**
 * 正则方法：
 */

let template = '我是{{name}}，年龄{{age}}，性别{{sex}}';
let person = {
    name: '布兰',
    age: 12
}

/**
 * 法1：
 * res.test(str)、reg.exec(str) 这两个函数仅仅匹配“第一个”，replace后再更新template，如此循环！
 */
function render(template, data) {
    const reg = /\{\{(\w+)\}\}/;

    if (reg.test(template)) {
        const arr = reg.exec(template)

        const name = arr[1]; // 捕获组 捕获的内容

        template = template.replace(reg, data[name]); // 将第一个模板字符串渲染

        return render(template, data); // 递归的渲染并返回渲染后的结构
    }

    return template; // 如果模板没有模板字符串直接返回
}

/**
 * 法2：由于exec中用全局匹配时更新lastIndex的特性，匹配、替换的字符串分开
 */
function render2(template, data) {
    const reg = /\{\{(\w+)\}\}/g;

    let regResult
    let finalStr = template
    while ((regResult = reg.exec(template)) !== null) {
        // regResult[0]  // 完整匹配的字符串
        // regResult[1]  // 捕获组捕获到的内容
        // 替换当前匹配项
        finalStr = finalStr.replace(regResult[0], data[regResult[1]])
    }
    return finalStr
}

let res = render2(template, person); // 我是布兰，年龄12，性别undefined
console.log(res)
