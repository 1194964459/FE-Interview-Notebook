Promise.resolve()
  .then(() => {
    // 使 .then() 返回一个 rejected promise
    throw new Error('Oh no!');
  })
  .catch(error => {
    console.error('onRejected function called: ' + error.message);
  })
  .then(() => {
    console.log("I am always called even if the prior then's promise rejects");
  });


//   onRejected function called: Oh no!
// I am always called even if the prior then's promise rejects