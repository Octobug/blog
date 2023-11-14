<template>
  <div :class="$style.column">
    <div :class="$style.aside">
      <Profile />
    </div>
    <div :class="$style.homefeed">
      <HomeFeed />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Profile from "../components/Profile.vue";
import HomeFeed from "../components/HomeFeed.vue";
</script>

<style scoped module>
.column {
  justify-content: center;
}

.aside {
  padding: 2rem 3rem;
}

.homefeed {
  padding: 0 4rem;
}

@media (min-width: 768px) {
  .aside {
    padding: 3rem;
  }

  .homefeed {
    padding: 0 6rem;
  }
}

@media (min-width: 960px) {
  .column {
    padding: 0rem 4rem;
    display: flex;
  }

  .aside {
    padding: 3rem;
  }

  .homefeed {
    max-width: 38rem;
    min-width: 38rem;
    padding: 3rem 3rem 0;
  }
}

@media (min-width: 1280px) {
  .column {
    padding: 0rem 8rem;
    display: flex;
  }

  .aside {
    padding: 4rem;
  }

  .homefeed {
    max-width: 48rem;
    min-width: 48rem;
    padding: 4rem 4rem 0;
  }
}
</style>
