let nums = [0,0,1,1,1,2,2,3,3,4]

for(let i=0; i<nums.length; i++){
    console.log('i:', i)
    let index = nums.indexOf(nums[i])
    let lastIndex = nums.lastIndexOf(nums[i])
    if(index != lastIndex){
        nums.splice(index+1, lastIndex-index)
    }
    console.log('nums: ', nums)
}
// return arr.length

// // leetcode 上不可以这样使用
// let arr = Array.from(new Set(nums))

// console.log('arr: ', arr)


