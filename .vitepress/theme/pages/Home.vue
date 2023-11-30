<template>
  <Container>
    <div :class="$style.aside">
      <Profile />
    </div>
    <div :class="$style.homefeed">
      <HomeFeed />
    </div>
  </Container>
</template>

<script lang="ts" setup>
import Container from "../components/Container.vue";
import Profile from "../components/Profile.vue";
import HomeFeed from "../components/HomeFeed.vue";
</script>

<style scoped module>
.aside {
  padding: 1.5rem;
  padding-top: 0;
}

@media (min-width: 768px) {
  .aside {
    padding: 0 3rem 3rem;
  }
}

@media (min-width: 960px) {
  .homefeed {
    max-width: 38rem;
    min-width: 38rem;
    padding: 0 3rem;
  }
}

@media (min-width: 1280px) {
  .aside {
    padding: 0 4rem;
  }

  .homefeed {
    max-width: 48rem;
    min-width: 48rem;
    padding: 0 4rem;
  }
}
</style>
