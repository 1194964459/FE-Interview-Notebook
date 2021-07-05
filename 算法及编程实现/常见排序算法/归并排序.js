// 归并排序：时间复杂度 nlog(n)
let arr = [49, 38, 65, 97, 23, 22, 76, 1, 5, 8, 2, 0, -1, 22]
// let arr = [3, 6, 2, 4, 1]

function merge(left, right) {
    let res = [];
    let i = 0;
    let j = 0;

    // 将两个有序数组合成一个有序数组
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            res.push(left[i]);
            i++;
        } else {
            res.push(right[j]);
            j++;
        }
    }
    // concat 不改变原数组
    if(i == left.length){
        return res.concat(right.slice(j))
    }else{
        return res.concat(left.slice(i))
    }
    // if (i < left.length) {
    //     res.push(...left.slice(i));
    // } else {
    //     res.push(...right.slice(j));
    // }

    // return res;
}
  
function mergeSort(arr) {
    if (arr.length < 2) {
        return arr;
    }

    const mid = Math.floor(arr.length / 2);

    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    return merge(left, right);
}
  
console.log(mergeSort(arr));
  