Promise.reject()
  .then(() => 99, () => 42) // onRejected returns 42 which is wrapped in a resolving Promise
  .then(solution => console.log('Resolved with ' + solution)); // Resolved with 42


  // Resolved with 42