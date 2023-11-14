<template>
  <div :class="$style.postList">
    <div
      v-for="post in postList"
      :key="post.src"
      :class="$style.postItem"
    >
      <a :href="post.url">
        <span :class="$style.title">{{ post.frontmatter.title }}</span>
      </a>
      <span :class="$style.date">
        {{ moment(post.frontmatter.datetime).format('ll') }}
      </span>
    </div>
  </div>

  <div :class="$style.pagination">
    <button
      v-if="page.cursor.value > 1"
      :class="$style.previous"
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
      :class="$style.next"
      @click="turnTo(page.cursor.value + 1)"
    >
      NEXT
    </button>
  </div>
</template>

<script lang="ts" setup>
import type { ContentData } from "vitepress";
import moment from "moment-timezone";
import { useData } from "vitepress";
import { ref } from "vue";
import { data as allPosts } from "../posts.data";

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
.postList {
  margin-bottom: 2rem;
}

.postItem {
  margin: var(--ct-post-list-gap);
  padding-bottom: 1px;
  border-bottom: 1px dashed var(--vp-c-default-3);
}

.title {
  display: block;
  color: var(--vp-c-neutral);
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.title:hover {
  font-weight: bold;
  font-style: italic;
}

.date {
  float: right;
  position: relative;
  bottom: 1.6em;
  font-size: 0.8em;
  color: var(--vp-c-text-3);
}

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

button {
  position: relative;
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-size: 1em;
  font-weight: 500;
  font-weight: bold;
  font-style: italic;
}

button:hover {
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
