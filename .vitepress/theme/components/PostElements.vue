<template>
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
    <Dot
      v-if="post.readingTime"
      :class="$style.dot"
    />
    <span :class="$style.elementItem">
      {{ post.readingTime }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import moment from "moment-timezone";
import { useData, onContentUpdated } from "vitepress";
import { ref } from "vue";
import { data as allPosts } from "../posts.data";
import { findPost } from "../utils";
import Dot from "./Dot.vue";

const { frontmatter, page } = useData();
let post = ref(getPostData());

function getPostData() {
  return findPost(allPosts, page.value).frontmatter || frontmatter.value;
}

onContentUpdated(() => {
  post.value = getPostData();
});
</script>

<style module scoped>
.elementList {
  border-top: 1px dashed var(--vp-c-divider);
  padding-top: 0.5rem;
  margin-top: 3rem;
  margin-bottom: -5rem;
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
