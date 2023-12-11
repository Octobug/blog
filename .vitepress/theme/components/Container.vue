<template>
  <div :class="$style.container">
    <slot />
  </div>
</template>

<style module scoped>
.container {
  justify-content: center;
  padding: 1.5rem 1.5rem 0;
}

@media (min-width: 640px) {
  .container {
    padding: 3rem 4rem 0;
  }
}

@media (min-width: 768px) {
  .container {
    padding: 3rem 6rem 0;
  }
}

@media (min-width: 960px) {
  .container {
    padding: 3rem 4rem 0;
    display: flex;
  }
}

@media (min-width: 1280px) {
  .container {
    padding: 4rem 8rem 0;
    display: flex;
  }
}
</style>
