const app = new Promise((res, rej) => {
  console.log('xx');
  res('123');
});

app
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });
