<template>
  <div
    name="post-elements"
    :class="$style.elementList"
    hidden
  >
    <span :class="$style.elementItem">
      {{ moment(post.datetime).format("LL") }}
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
  return findPost(allPosts, page.value)?.frontmatter || frontmatter.value;
}

function adjustPosition() {
  const elements = document.getElementsByName("post-elements");
  if (elements.length > 1) {
    return;
  }
  const block = elements[0];
  const title = document.querySelector(".main h1");
  const parent = title?.parentElement;
  if (block && title && parent) {
    const newBlock = block.cloneNode(true);
    (<Element>newBlock).removeAttribute("hidden");
    parent.insertBefore(newBlock, title.nextSibling);
  }
}

onContentUpdated(() => {
  post.value = getPostData();
  setTimeout(adjustPosition, 1);
});
</script>

<style module scoped>
.elementList {
  border-top: 1px dashed var(--vp-c-divider);
  padding-top: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 2rem;
  font-size: 0.88rem;
  white-space: nowrap;
  overflow-x: scroll;

  /* Internet Explorer 10+ */
  -ms-overflow-style: none;
  /* Firefox */
  scrollbar-width: none;
}

.elementList::-webkit-scrollbar {
  /* Safari and Chrome */
  display: none;
}

.elementItem {
  color: var(--vp-c-text-3);
}

.dot {
  color: var(--vp-c-text-2);
  margin: 0.5rem;
}
</style>
