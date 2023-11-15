<template>
  <div :class="$style.postHeader">
    <h1 :class="$style.title">
      {{ post.title }}
    </h1>
    <div :class="$style.elementList">
      <span :class="$style.elementItem">
        {{ moment(post.date).format("LL") }}
      </span>
      <Dot
        v-if="post.location"
        :class="$style.dot"
      />
      <span
        v-if="post.location"
        :class="$style.elementItem"
      >
        {{ post.location }}
      </span>
      <Dot :class="$style.dot" />
      <span :class="$style.elementItem">
        {{ post.readingTime }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import moment from "moment-timezone";
import { useData, onContentUpdated } from "vitepress";
import { ref } from "vue";
import Dot from "./Dot.vue";
import { data as allPosts } from "../posts.data";

const { frontmatter } = useData();
let post = ref(getCurrentPost());

function getCurrentPost() {
  return allPosts.find(
    p => p.frontmatter.title === frontmatter.value.title
  )?.frontmatter || frontmatter.value;
}

onContentUpdated(() => {
  post.value = getCurrentPost();
});
</script>

<style module scoped>
.postHeader {
  margin-bottom: 2.5rem;
}

.title {
  padding-bottom: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 0.3em;
  font-size: 1.8em;
  font-weight: 600;
  border-bottom: 1px dashed var(--vp-c-divider);
}

.elementList {
  font-size: 0.88rem;
}

.elementItem {
  color: var(--vp-c-text-3);
}

.dot {
  color: var(--vp-c-text-2);
  margin: 0.5rem;
}
</style>
