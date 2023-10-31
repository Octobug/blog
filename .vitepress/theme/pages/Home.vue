<template>
  <div :class="$style.column">
    <div :class="$style.sidebar">
      <Profile />
    </div>
    <div :class="$style.homefeed">
      <!-- <HomeFeed /> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import Profile from "../components/Profile.vue";
// import HomeFeed from "../components/HomeFeed.vue";
</script>

<style module>
.column {
  justify-content: center;
}

.sidebar {
  padding: 2rem 4rem;
}

.homefeed {
  padding: 0 4rem;
}

@media (min-width: 960px) {
  .column {
    padding: 0rem 4rem;
    display: flex;
  }

  .sidebar {
    padding: 3rem 1rem 3rem 3rem;
  }

  .homefeed {
    min-width: 40rem;
    padding: 3rem 3rem 3rem 1rem;
  }
}

@media (min-width: 1280px) {
  .column {
    padding: 0rem 8rem;
    display: flex;
  }

  .sidebar {
    padding: 4rem 2rem 4rem 4rem;
  }

  .homefeed {
    min-width: 60rem;
    padding: 4rem 4rem 4rem 2rem;
  }
}
</style>
