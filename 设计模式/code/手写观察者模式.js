
// 发布者
class Subject {
    constructor(){
        this.observers = []
        this.state = 0
    }

    getState(){
        return this.state
    }

    setState(state){
        this.state = state
        this.notifyAllObservers()
    }

    notifyAllObservers(){
        this.observers.map( observer => {
            observer.update()
        })
    }

    attach(observer){
        this.observers.push(observer)
    }
}

// 订阅者（也称为‘观察者’）
class Observer {
    constructor(name, subject){
        this.name = name
        this.subject = subject
        this.subject.attach(this)
    }

    update(){
        console.log('观察者中 this.subject.state', this.subject.state)
    }
}

let s = new Subject()
let o1 = new Observer('o1', s)

s.setState(1)
