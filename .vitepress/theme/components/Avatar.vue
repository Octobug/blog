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

<style scoped module>
.frame {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
}

.avatar {
  border-radius: 50%;
  border: 2px solid var(--ct-avatar-border);
  width: var(--ct-avatar-medium);
  height: var(--ct-avatar-medium);
}

@media (max-width: 768px) {
  .avatar {
    width: var(--ct-avatar-small);
    height: var(--ct-avatar-small);
  }

  .frame {
    padding: 0 0 1.5rem;
  }
}
</style>
