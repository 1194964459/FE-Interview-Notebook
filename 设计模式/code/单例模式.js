class Singleton {
    constructor(name) {
        this.name = name
        this.instance = null;
    }

    getName() {
        console.log(this.name)
    }

    static getInstance(name) {
        if (!this.instance) {
            this.instance = new Singleton(name)
        }
        return this.instance
    }
}

//验证
var a = Singleton.getInstance('a');
var b = Singleton.getInstance('b');
a.getName(); //a
b.getName(); //a
console.log(a === b);//true
