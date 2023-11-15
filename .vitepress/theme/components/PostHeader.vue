<template>
  <div :class="$style.postHeader">
    <h1 :class="$style.title">
      {{ frontmatter.title }}
    </h1>
    <div :class="$style.elementList">
      <Dot />
      <span :class="$style.elementItem">
        {{ moment(frontmatter.date).format("LL") }}
      </span>
      <Dot v-if="frontmatter.location" />
      <span :class="$style.elementItem">
        {{ frontmatter.location }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import moment from "moment-timezone";
import { useData } from "vitepress";
import Dot from "./Dot.vue";

const { frontmatter } = useData();
</script>

<style module scoped>
.postHeader {
  padding-bottom: 2rem;
}

.title {
  padding-bottom: 1rem;
  margin-bottom: 0.3em;
  font-size: 1.8em;
  font-weight: 600;
  border-bottom: 1px dashed var(--vp-c-divider);
}

.elementList {
  color: var(--vp-c-text-3);
  font-size: 0.9rem;
}

.elementItem {
  margin-right: 1rem;
}
</style>
