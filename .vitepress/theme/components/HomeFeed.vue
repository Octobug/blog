<template>
  <div :class="$style.postListBox">
    <PostList
      date-format="ll"
      :post-list="postList"
    />
  </div>

  <div :class="$style.pagination">
    <button
      v-if="page.cursor.value > 1"
      :class="[$style.pageButton, $style.previous]"
      @click="turnTo(page.cursor.value - 1)"
    >
      PREV
    </button>
    <div
      v-if="page.total > 1"
      class="digit"
      :class="$style.pageNumber"
    >
      {{ `${page.cursor.value}/${page.total}` }}
    </div>
    <button
      v-if="page.cursor.value < page.total"
      :class="[$style.pageButton, $style.next]"
      @click="turnTo(page.cursor.value + 1)"
    >
      NEXT
    </button>
  </div>
</template>

<script lang="ts" setup>
import type { ContentData } from "vitepress";
import { onContentUpdated, useData } from "vitepress";
import { ref } from "vue";
import { toDashedHash } from "../utils";
import { data as allPosts } from "../posts.data";
import PostList from "./PostList.vue";

const { theme } = useData();
const page = {
  size: theme.value.pageSize,
  total: Math.ceil(allPosts.length / theme.value.pageSize),
  cursor: ref(1)
};

const postList = ref<ContentData[]>([]);
postList.value = allPosts.slice(0, page.size);

function turnTo(n: number) {
  history.pushState(null, "", `#${toDashedHash(n.toString())}`);
  n = Math.min(n, page.total);
  page.cursor.value = n;
  const start = (n - 1) * page.size;
  postList.value = allPosts.slice(start, start + page.size);
}

function setPostListMinHeight() {
  const root = document.querySelector(":root");
  const h = Math.min(allPosts.length, theme.value.pageSize) * 2.9;
  (<HTMLElement>root).style.setProperty("--post-list-min-height", `${h}rem`);
}

function loadPage() {
  const defaultPage = parseInt(window.location.hash?.slice(1));
  page.cursor.value = defaultPage || 1;
  turnTo(page.cursor.value);
}

onContentUpdated(() => {
  setPostListMinHeight();
  loadPage();
});
</script>

<style module scope>
:root {
  --post-list-min-height: 29rem;
}

.postListBox {
  min-height: var(--post-list-min-height);
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-style: italic;
}

.pageNumber {
  color: var(--vp-c-text-3);
  font-size: 0.9em;
}

.pageButton {
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-size: 1em;
  font-weight: 500;
  font-weight: bold;
  font-style: italic;
}

.pageButton:hover {
  border-bottom: 3px solid var(--vp-c-text-1);
}

.previous {
  position: absolute;
  left: 0;
}

.next {
  position: absolute;
  right: 0;
}
</style>
