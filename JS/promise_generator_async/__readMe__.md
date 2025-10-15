见 ES6章节中的[async](https://github.com/1194964459/FE-Interview-Notebook/blob/main/JS/ES6/7.2__async.md)

见 ES6章节中的[iterator](../ES6/迭代器/iterator.md)

##



## 如何实现Promise？
`new Promise((resolve, reject)=>{})`，resolve、reject是两个函数，主要负责修改Promise的状态，然后将异步操作的结果或报的错误作为参数传递出去。
resolve将promise状态从pending变为resolved(成功态)
reject将promise状态从pending变为rejected(失败态)


then：主要是处理异步操作的结果。接受2个参数（分别指定promise实例状态改变后的回调函数），返回一个新的promise（称为 promise2）。
    异步三种结果：
        fullfilled：
        rejected：
        pending：
    then回调函数的返回值x：
        x是promise对象：promise2 的状态由 x 的状态决定。
            若 x 成功，promise2 也成功，且 x 的成功值作为 promise2 的成功值。
            若 x 失败，promise2 也失败，且 x 的失败原因作为 promise2 的失败原因。
        x是非promise的普通值（如数字、字符串、对象等）：promise2会将这个“普通值”作为“成功结果”




