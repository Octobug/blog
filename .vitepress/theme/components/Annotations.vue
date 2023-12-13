<template>
  <div class="annotations">
    <div
      v-if="frontmatter.sort"
      class="sortBox"
    >
      <a
        :href="withBase(`/sorts#${toDashedHash(frontmatter.sort)}`)"
        class="sort"
      >
        {{ frontmatter.sort?.toUpperCase() }}
      </a>
    </div>
    <Dot
      v-if="frontmatter.sort && frontmatter.tags.length"
      class="dot"
    />
  </div>
</template>

<script lang="ts" setup>
import { useData, withBase } from "vitepress";
import { toDashedHash } from "../utils";
import Dot from "../components/Dot.vue";

const { frontmatter } = useData();
</script>

<style scoped>
.annotations {
  border-top: 1px solid var(--vp-c-divider);
  padding: 2rem 0;
  font-size: 14px;
}

.sortBox {
  display: inline-block;
}

.sort {
  color: var(--vp-c-neutral-inverse);
  background-color: var(--vp-c-brand-3);
  font-weight: bold;
  border-radius: 4px;
  padding: 4px 8px;
}

.sort:hover {
  background-color: var(--vp-c-brand-1);
}

.dark .sort {
  background-color: var(--vp-c-brand-1);
}

.dark .sort:hover {
  background-color: var(--vp-c-brand-2);
}

.dot {
  margin: 0.7rem;
}
</style>
