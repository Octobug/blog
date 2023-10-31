<template>
  <Avatar />
  <div :class="$style.profile">
    <h1 :class="$style.title">
      <span>{{ nickname }}</span>
    </h1>
    <p :class="$style.bio">
      <span :class="$style.dot">•</span>
      <span>{{ bio }}</span>
    </p>
    <ProfileExtra />
  </div>
</template>

<script lang="ts" setup>
import { useData } from "vitepress";
const { theme } = useData();
const { nickname, bio } = theme.value;
import Avatar from "./Avatar.vue";
import ProfileExtra from "./ProfileExtra.vue";
</script>

<style module>
.profile {
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 0 15px;
  text-align: center;

  .title {
    display: flex;
    align-items: center;
    font-size: 2em;
    font-weight: 500;
  }

  .bio {
    margin: 1em 0;
    color: var(--vp-c-neutral);
    white-space: nowrap;

    .dot {
      color: var(--vp-c-text-3);
      font-size: x-small;
      margin: 0 6px;
      vertical-align: bottom;
    }
  }
}
</style>
