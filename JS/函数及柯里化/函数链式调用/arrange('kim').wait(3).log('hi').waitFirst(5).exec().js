// arrange('kim').wait(3).log('hi').waitFirst(5).exec()
// wait 5s 
// kim
// wait 3s 
// hi

class TaskQueue {
    constructor() {
        this.tasks = []
        this.firstWait = 0
        this.betweenWait = 0
    }

    arrange(str) {
        this.tasks.push(str)
        return this
    }

    log(str) {
        this.tasks.push(str)
        return this
    }

    waitFirst(ms) {
        this.firstWait = ms
        return this
    }
    wait(ms) {
        this.betweenWait = ms
        return this
    }

    // TODO:这里需注明异步
    async exec() {
        // debugger
        // await new Promise(resolve => setTimeout(() => resolve, this.firstWait))  TODO:这种写法是错误的❌
        await new Promise(resolve => setTimeout(resolve, this.firstWait))

        console.log(`wait ${this.firstWait}s`)

        console.log(this.tasks[0])
        for (let i = 1; i < this.tasks.length; i++) {
            await new Promise(resolve => setTimeout(resolve, this.betweenWait))
            console.log(`wait ${this.betweenWait}s`)
            console.log(this.tasks[i])
        }
    }
}

function arrange(str) {
    return new TaskQueue().arrange(str)
}

arrange('kim').wait(3).log('hi').waitFirst(5).exec()
// wait 5s 
// kim
// wait 3s 
// hi
