<template>
  <div
    v-if="post.datetime || post.spot || post.readingTime"
    name="post-elements"
    :class="$style.elementList"
    class="hide-scrollbar"
  >
    <span
      v-if="post.datetime"
      :class="$style.elementItem"
      :tooltip="moment(post.datetime).format('dddd')"
    >
      {{ moment(post.datetime).format("LL") }}
    </span>
    <Dot
      v-if="post.spot"
      :class="$style.dot"
    />
    <span
      v-if="post.spot"
      :class="$style.elementItem"
      :tooltip="post.location?.district"
    >
      {{ `${post.location?.city || ""} ${post.spot}` }}
    </span>
    <Dot
      v-if="post.readingTime"
      :class="$style.dot"
    />
    <span
      v-if="post.readingTime"
      :class="$style.elementItem"
      :tooltip="`${post.words} words`"
    >
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

onContentUpdated(() => {
  post.value = getPostData();
});
</script>

<style module scoped>
.elementList {
  border-top: 1px dashed var(--vp-c-divider);
  padding-top: 0.5rem;
  padding-bottom: 2rem;
  margin-top: 0.5rem;
  font-size: 0.88rem;
  white-space: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
}

.elementItem {
  color: var(--vp-c-text-3);
}

span.elementItem {
  position: relative;
  display: inline-block;
}

span.elementItem[tooltip]:after {
  content: attr(tooltip);
  position: absolute;
  bottom: -80%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 10px;
  line-height: 16px;
  color: var(--vp-c-text-3);
  background-color: var(--vp-c-default-soft);
  border: 1px solid var(--vp-c-default-3);
  border-radius: 3px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.05);
  padding: 0 4px;
  opacity: 0;
  transition: 0.25s all;
}

span.elementItem[tooltip]:hover:after {
  opacity: 1;
  transition-delay: 0.5s;
}

.dot {
  color: var(--vp-c-text-2);
  margin: 0.5rem;
}
</style>
