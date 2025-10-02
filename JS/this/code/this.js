const obj = {
    name: 'objName',
    say() {
        console.log(this.name);
    },
    read: () => {
        console.log(this.name);
    }
}
obj.say(); // objName
obj.read();  // undefined