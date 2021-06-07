// let prices = [7,1,5,3,6,4]
let prices = [2,4,1]

var maxProfit = function(prices) {
    let min = prices[0]
    let max = 0
    for(let i = 1; i < prices.length; i++){
        if(prices[i] < min){
            min = prices[i]
        }
        let val = prices[i] - min
        if( val > max){
            max = val
        }    
    }
};