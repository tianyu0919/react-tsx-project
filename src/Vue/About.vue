<template>
  <div>
    <h1>{{ msg }}</h1>
    <Me />
  </div>
</template>

<script>
import Me from './Components/Me.vue';
export default {
  name: 'About',
  data: () => ({
    msg: 'About as Vue Application'
  }),
  components: {
    Me
  }
};
</script>
