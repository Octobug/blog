<template>
  <PostList
    date-format="ll"
    :post-list="postList"
  />

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
import { useData } from "vitepress";
import { ref } from "vue";
import { data as allPosts } from "../posts.data";
import PostList from "./PostList.vue";

const { theme } = useData();
const allPostsLength = allPosts.length;
const page = {
  size: theme.value.pageSize,
  total: Math.ceil(allPostsLength / theme.value.pageSize),
  cursor: ref(1)
};

const postList = ref<ContentData[]>([]);
postList.value = allPosts.slice(0, page.size);

function turnTo(n: number) {
  page.cursor.value = n;
  const start = (n - 1) * page.size;
  postList.value = allPosts.slice(start, start + page.size);
}
</script>

<style module scope>
.pagination {
  padding-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-style: italic;
}

.pageNumber {
  color: var(--vp-c-text-2);
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
