interface MathFunction {
    // (a: number, b: number)=> number;  // 错误❌
    (a: number, b: number): number;  // 正确 ✅
    func: (a: number, b: number) => number;
    funb(a: number, b: number): number
}


// interface MathFunction {
//     (a: number, b: number): string;
//     multiply(a: number, b: number): number; // 另一种语法（等价于上面）

// }

type func = (a: number, b: number) => number;

const mathUtils = {
    add: (a: number, b: number) => a + b,
    multiply: (a: number, b: number) => a * b
};

interface MathUtils {
    add(a: number, b: number): number;
    multiply(a: number, b: number): number;
}
