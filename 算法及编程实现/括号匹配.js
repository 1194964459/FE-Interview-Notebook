function resolve(strs){
	let arr = []
	for(let i = 0; i < strs.length; i++){
		if(strs[i]=='(' || strs[i]=='[' || strs[i]=='{'){
			arr.push(strs[i])   
		}else if(strs[i]==')' || strs[i]==']' || strs[i]=='}'){
			let num =  arr.pop()
			if(num==''){
			   return false
			}
		}
	}
	if(!arr.length){
	   return true
	}
}