/**
 * 二分查找
 *
 * @param {(number | string)[]} array
 * @param {number | string} target
 * @returns {number}
 */
function binarySearch(array, target) {
    let low = 0;
    let height = array.length - 1;
    while (low <= height) {
        const middle = Math.floor((low + height) / 2);
        if (target === array[middle]) return middle;
        else if (target > array[middle]) low = middle + 1;
        else height = middle - 1;
    }
    return -1;
}

let arr = [3, 6, 2, 4, 1]
console.log(binarySearch(arr, 5))  // -1
console.log(binarySearch(arr, 4))  // 3
