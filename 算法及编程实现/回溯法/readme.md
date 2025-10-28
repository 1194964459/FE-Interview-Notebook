组合的几种情况：

参数列表中有无重复数字、返回值中数字是否可以出现多次？
1. [参数、返回值 都没重复数字：](./77_组合.js)
```js
  zuhe.push(nums[idx]);
  helper(nums, idx + 1, k, zuhe, res);    // 数字不能被重复选取，idx+1
  zuhe.pop();

  helper(nums, idx + 1, k, zuhe, res);  
```

2. [参数中无重复、返回值中可被重复选取](./LCR_81_组合总和.js)

```js
// helper函数内逻辑：
  zuhe.push(nums[idx]);
  helper(nums, idx, target - nums[idx], zuhe, res);  // 数字可被重复选取，idx
  zuhe.pop();

  helper(nums, idx + 1, target, zuhe, res);   // 不把当前字符加进去... 直接考虑下一个字符
```
3. [参数中有重复数字，返回值中每个值只能出现一次](./LCR_82_组合总和2.js)

```js
// helper函数内逻辑：

let lst = nums.findLastIndex(a => a === nums[idx])

  if (lst != -1) {
    if (lst === idx) { // 数字不重复
      zuhe.push(nums[idx]);
      helper(nums, idx + 1, target - nums[idx], zuhe, res);
      zuhe.pop();

      helper(nums, idx + 1, target, zuhe, res);
    }
    else { // 数字重复
      zuhe.push(nums[idx]);
      helper(nums, idx + 1, target - nums[idx], zuhe, res);
      let cur = zuhe.pop();
      if (nums[idx] === cur) {
        helper(nums, lst + 1, target, zuhe, res);  // TODO:此处是否应该return?
      }
    }
  }
```
