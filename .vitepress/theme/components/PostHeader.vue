<template>
  <div :class="$style.postHeader">
    <h1 :class="$style.title">
      {{ post.title }}
    </h1>
    <div :class="$style.elementList">
      <Dot />
      <span :class="$style.elementItem">
        {{ moment(post.date).format("LL") }}
      </span>
      <Dot v-if="post.location" />
      <span
        v-if="post.location"
        :class="$style.elementItem"
      >
        {{ post.location }}
      </span>
      <Dot />
      <span :class="$style.elementItem">
        {{ post.readingTime }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import moment from "moment-timezone";
import { useData } from "vitepress";
import Dot from "./Dot.vue";
import { data as allPosts } from "../posts.data";

const { frontmatter } = useData();
const post = allPosts.find(
  p => p.frontmatter.title === frontmatter.value.title
)?.frontmatter || frontmatter.value;
</script>

<style module scoped>
.postHeader {
  padding-bottom: 1.5rem;
}

.title {
  padding-bottom: 1rem;
  margin-top: 1rem;
  margin-bottom: 0.3em;
  font-size: 1.8em;
  font-weight: 600;
  border-bottom: 1px dashed var(--vp-c-divider);
}

.elementList {
  color: var(--vp-c-text-3);
  font-size: 0.88rem;
}

.elementItem {
  margin-right: 1rem;
}
</style>
