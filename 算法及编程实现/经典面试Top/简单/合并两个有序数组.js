let nums1 = [1,2,3,0,0,0], nums2 = [2,5,6], m = 3, n = 3

let i = m - 1, j = n - 1, k = nums1.length-1
while(i >= 0 && j >= 0){
    if(nums1[i] < nums2[j]){
        nums1[k] = nums2[j]
        --j
    }else{
        nums1[k] = nums1[i]
        --i
    }
    --k;
}

let res = []

if(j>=0) res = nums1.slice(0, j+1).concat(nums1)



console.log('nums1: ',nums1)