<template>
  <div class="app">
    <header>
      {{ title }}
    </header>
    <section>
      {{ message }}
    </section>
    <footer>
      {{ version }}
    </footer>
  </div>
</template>

<script>
export default {
  data: () => ({
    title: 'Mon application',
    message: 'Hello world !',
    version: '© 2018'
  })
}
</script>

<style>
body {
  margin: 0;
}

.app {
  min-height: 100vh;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.app > * {
  padding: 16px;
}

section {
  color: red;
  flex: 1
}
</style>
