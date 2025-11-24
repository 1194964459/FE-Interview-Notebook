
class Person {
    constructor() {
        // this.tasks = []
    }

    eat() {
        // this.tasks.push(str)
        console.log('eat')
        return this
    }
    async sleep(timer) {
        await new Promise(resolve => setTimeout(resolve, timer))
        return this
    }
}
let person = new Person()

// TODO:会报错，
// person.eat()
//     .sleep(2)
//     .eat()


async function run() {
    await person.eat()
        .sleep(2)
        .eat()
}

run()
