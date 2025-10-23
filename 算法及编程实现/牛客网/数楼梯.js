let num = 4
function func(n) {
    console.log('n:', n)
    if (n <= 2) {
        return n
    }

    return func(n) + func(n - 1)
}

console.log(func(num))
