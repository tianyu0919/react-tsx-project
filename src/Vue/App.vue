<template>
  <div class="App">
    <h1>{{ msg }} {{ num }}</h1>
    <a-Button @click="add">增加</a-Button>
    <a-Button @click="jian">相减</a-Button>
  </div>
</template>

<script>
export default {
  name: 'APP',
  data: () => ({
    num: 0,
    msg: 'Hello Word this is Vue Application'
  }),
  methods: {
    add() {
      this.num++;
    },
    jian() {
      this.num--;
    }
  }
};
</script>

<style lang="less" scoped>
.App {
  border: 1px solid red;
  h1 {
    color: orange;
  }
}
</style>
