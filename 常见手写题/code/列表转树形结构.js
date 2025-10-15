
// pid  通过这个字段来确定子父级
let arr = [
    { id: 1, name: '部门1', pid: 0 },
    { id: 2, name: '部门2', pid: 1 },
    { id: 3, name: '部门3', pid: 1 },
    { id: 4, name: '部门4', pid: 3 },
    { id: 5, name: '部门5', pid: 4 },
]
// 只取前两个样例
// 转成结果1()： 有孩子节点时，才有children属性
let result = [
    {
        id: 1,
        text: '节点1',
        pid: 0,
        children: [
            {
                id: 2,
                text: '节点1_1',
                pid: 1
            }
        ]
    }
]

// 转成结果2：不管有无孩子节点，都有children属性
result = [
    {
        id: 1,
        text: '节点1',
        pid: 0,
        children: [
            {
                id: 2,
                text: '节点1_1',
                pid: 1,
                children: []
            }
        ]
    }
]

function listToTree(data) {
    let temp = {};
    let treeData = [];

    for (let it of data) {
        temp[it.id] = it;
    }

    for (let i in temp) {
        let it_pid = temp[i].pid
        if (it_pid != 0) {
            if (!temp[it_pid].children) {
                temp[it_pid].children = [];
            }

            temp[it_pid].children.push(temp[i]);
        } else {
            treeData.push(temp[i]);
        }
    }

    return treeData;
}

let res = listToTree(arr)


function arrayToTree(items) {
    const result = [];   // 存放结果集
    const itemMap = {};  // 

    // 先转成map存储
    for (const item of items) {
        itemMap[item.id] = { ...item, children: [] }
    }

    for (const item of items) {
        const pid = item.pid;
        const treeItem = itemMap[item.id];
        // 根节点
        if (pid === 0) {
            result.push(treeItem);
        }
        // 若是子节点，找到其父节点并将它假如children
        else {
            itemMap[pid].children.push(treeItem)
        }

    }
    return result;
}
// let res = arrayToTree(arr)
console.log(JSON.stringify(res))
