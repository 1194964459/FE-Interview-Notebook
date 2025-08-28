const path = require('path')
let func = require('./func.js')

const p = path.join(__dirname, '../src/index.js')

async function res() {
    console.log('aaa')
    try {
        const result = await func.extractDependencies(p);
        console.log(`文件: ${result.file}`);
        console.log('依赖:');
        result.dependencies.forEach(dep => console.log(`- ${dep}`));
    } catch (error) {
        console.error('发生错误:', error);
    }
}

res()
