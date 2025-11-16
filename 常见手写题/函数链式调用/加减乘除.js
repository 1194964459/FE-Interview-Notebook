// calc.add(5).multiply(2).subtract(3).divide(2).getValue();

class Calculator {
    constructor() {
        this.value = 0
    }

    add(num) {
        this.value += num;
        return this; // 返回当前对象，以支持链式调用
    }

    subtract(num) {
        this.value -= num;
        return this;
    }

    multiply(num) {
        this.value *= num;
        return this;
    }

    divide(num) {
        this.value /= num;
        return this;
    }

    getValue(num) {
        return this.value
    }
}

let calc = new Calculator()
let result = calc.add(5).multiply(2).subtract(3).divide(2).getValue();
console.log(result)
