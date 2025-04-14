const p1 = new Promise((resolve, reject) => {
  resolve('hello');
})
  .then(result => {
    console.log('p1:', result)
    return result
  })
  .catch(e => e);

const p2 = new Promise((resolve, reject) => {
  throw new Error('报错了');
})
  .then(result => result)
  .catch(e => e);

Promise.all([p1, p2])
  .then(result => console.log('all:', result))
// .catch(e => console.log('\n\n error:', e));
// ["hello", Error: 报错了]