let nums = [0,1,0,3,12]
for(let i = nums.length - 1; i >= 0; i--){
    if(nums[i] == 0){
    // i以及i右边的数值，都需要向右移 
        for(let j = i; j < nums.length -1; j++){
            // 交换数组两个位置的值
            let temp = nums[j]
            nums[j] = nums[j + 1]
            nums[j + 1] = temp
        }
        console.log('arr： ', nums)
    }
}
let bb = nums;

console.log('res： ', bb)

