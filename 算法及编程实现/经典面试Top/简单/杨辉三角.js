var generate = function(numRows) {
    let res = []

    for(let i=0; i<numRows; i++){
        let otherRows = getNumRows(i, i != 0 ? res[i-1]: null)
        res.push(otherRows)
    }
    
    return res;
};

var getNumRows = (index, rowData)=>{
    if(index == 0){
        return [1]
    }
    let res = [],i = 0
    for(; i < rowData.length; i++){
        let data 
        if( i == 0 ){
            data = rowData[i]
        }else{
            data = rowData[i - 1] + rowData[i]
        }
        res.push(data)
    }
    if(i == rowData.length){
        res.push(rowData[rowData.length-1])
    }
    return res
}

let res = generate(3)
console.log('结果是:', res)

