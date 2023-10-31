<template>
  <div :class="$style.frame">
    <img
      :src="theme.avatar"
      :class="$style.avatar"
    >
  </div>
</template>

<script lang="ts" setup>
import { useData } from "vitepress";
const { theme } = useData();
</script>

<style module>
.frame {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
}

.avatar {
  border-radius: 50%;
  border: 2px solid var(--vp-avatar-border);
  height: var(--vp-avatar-medium);
}
</style>
