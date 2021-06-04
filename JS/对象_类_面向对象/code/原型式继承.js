
function object(o) { 
    function F() {} 
    F.prototype = o; 
    return new F(); 
}

let person = { 
    name: "Nicholas", 
    friends: ["Shelby", "Court", "Van"] 
}; 

let anotherPerson = object(person); 
anotherPerson.name = "Greg"; 
anotherPerson.friends.push("Rob"); 
anotherPerson.age = 18
console.log('实例对象： ', anotherPerson)


let yetAnotherPerson = object(person); 
yetAnotherPerson.name = "Linda"; 
yetAnotherPerson.friends.push("Barbie"); 
   
   console.log(person.friends); // "Shelby,Court,Van,Rob,Barbie"

