/*
 * @Author: 卢天宇
 * @Date: 2023-08-15 15:30:00
 * @Description:
 */
class Publish {
  constructor() {
    this.lists = {};
  }

  subscribe(key, fn) {
    if (!this.lists[key]) {
      this.lists[key] = [];
    }
    this.lists[key].push(fn);
  }

  unSubscribe(key, fn) {
    if (this.list[key]) {
      this.lists[key] = this.lists[key].filter(item => item !== fn);
    }
  }

  dispatch(key) {
    this.lists[key].forEach(fn => {
      fn();
    });
  }
}

const publish = new Publish();

function callback() {
  console.log('我是test1');
}

publish.subscribe('test', callback);
publish.subscribe('test', () => {
  console.log('我是test2');
});
publish.subscribe('test', () => {
  console.log('我是test3');
});

publish.dispatch('test');
