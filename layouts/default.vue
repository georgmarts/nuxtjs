<template>
  <div class="layout">
    <Header />
      <div class='children'>
        <slot />
      </div>
      <Footer/>
  </div>
</template>

<style lang="scss">
@use "../assets/scss/main.scss";

.layout {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.children {
  flex-grow: 1;
}

</style>