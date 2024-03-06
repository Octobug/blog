<template>
  <div :class="$style.postList">
    <span :class="[$style.date, $style.hack]">
      {{ moment(new Date("1970-04-22")).format(dateFormat) }}
    </span>
    <div
      v-for="post in postList"
      :key="post.url"
      :class="$style.postItem"
    >
      <a :href="post.url">
        <span :class="$style.title">{{ post.frontmatter.title }}</span>
      </a>
      <span :class="$style.date">
        {{ moment(post.frontmatter.datetime).format(dateFormat) }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import moment from "moment-timezone";
import Post from "../types/post";

defineProps({
  postList: {
    type: Array<Post>,
    default: []
  },
  dateFormat: {
    type: String,
    default: "ll"
  }
});
</script>

<style module scoped>
.postList {
  margin-bottom: 2rem;
}

.postItem {
  margin: 1.2rem 0;
  padding-bottom: 1px;
  border-bottom: 1px dashed var(--vp-c-default-3);
}

.title {
  display: block;
  color: var(--vp-c-neutral);
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.title:hover {
  font-weight: bold;
  font-style: italic;
}

.date {
  float: right;
  position: relative;
  bottom: 1.37rem;
  font-family: monospace;
  font-size: 0.8rem;
  margin-left: 0.5rem;
  color: var(--vp-c-text-3);
}

.hack {
  visibility: hidden;
}
</style>
