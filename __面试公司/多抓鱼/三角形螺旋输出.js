// 题目我记得是:把数字以等边三角形螺旋排序好输入的参数是等边的数字个数，如:输入5，那么排序就是:
// 1 12 11 10 9
// 2 13 15 8
// 3 14 7
// 4 6
// 5
// 输出结果就要是:1 12 11 10 9 2 13 15 8 3 14 7 4 6 5

// let a = Array(3).fill(0)
// console.log(a)

function spiralTriangle(n) {
    const total = n * (n + 1) / 2;
    const triangle = Array.from({ length: n + 2 }, (_, row) => Array(n + 2).fill(1));

    // 初始化三角形数组（row行，每行col列，用0占位）
    // const triangle = Array.from({ length: n }, (_, row) =>
    //     Array(n - row).fill(0)
    // );
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= n - i + 1; j++) {
            triangle[i][j] = 0
        }
    }

    let cur = 1;
    let x = 1, y = 1; // 当前位置（初始在第0行第0列）
    let dir = 0  // 当前方向

    while (cur <= total) {
        triangle[x][y] = cur++;

        switch (dir) {
            case 0:
                if (triangle[x + 1][y] == 0) {
                    x++
                } else {
                    dir = 1
                    x--
                    y++
                }
                break

            case 1:
                if (triangle[x - 1][y + 1] == 0) {
                    x--
                    y++;
                } else {
                    dir = 2, y--;
                }
                break;
            case 2:
                if (triangle[x][y - 1] == 0) {
                    y--
                } else {
                    dir = 0, x++;
                }
                break;
        }
    }
    let res = []
    for (let i = 1; i <= n; i++) {
        let item = triangle[i].slice(1, n + 2 - i)
        res = res.concat(item)   // TODO:注意需再重新赋值给res
    }
    console.log(res.join(' '))
    return res
}

// 测试：输入5
spiralTriangle(5);
// 输出：1 12 11 10 9 2 13 15 8 3 14 7 4 6 5
