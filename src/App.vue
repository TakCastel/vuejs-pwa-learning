<template>
  <div class="hello-world">
    Hello {{ message }}
  </div> 
</template>

<script>
export default {
  data: () => ({
    message: 'world !'
  })
}
</script>

<style>
  .hello-world {
    padding: 16px;
    color: red;
  }
</style>
