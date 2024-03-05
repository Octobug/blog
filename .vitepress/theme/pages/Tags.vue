<template>
  <Container :class="$style.container">
    <div :class="$style.main">
      <div :class="$style.tagContainer">
        <div
          :class="$style.tagList"
          class="hide-scrollbar"
        >
          <Badge
            v-for="tag of tags"
            :key="tag"
            :text="tag"
            :number="postsByTag[tag].length"
            :link="true"
            :selected="tag === selectedTag"
            @click="selectTag(tag)"
          />
        </div>
        <div :class="$style.transientBox" />
      </div>
      <PostList
        date-format="ll"
        :post-list="postsByTag[selectedTag]"
      />
    </div>
  </Container>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { data as allPosts } from "../posts.data";
import { toDashedHash } from "../utils";
import Badge from "../components/Badge.vue";
import Container from "../components/Container.vue";
import PostList from "../components/PostList.vue";

const postsByTag = {};
allPosts.forEach(post => {
  post.frontmatter.tags.forEach(tag => {
    postsByTag[tag] = postsByTag[tag] || [];
    postsByTag[tag].push(post);
  });
});

const ALL = "All";
postsByTag[ALL] = allPosts;

const tags = Object.keys(postsByTag).sort((a, b) => {
  if (postsByTag[a].length == postsByTag[b].length) {
    return a.localeCompare(b);
  }
  return postsByTag[b].length - postsByTag[a].length;
});

const hashToTag = {};
Object.keys(postsByTag).forEach(tag => {
  hashToTag[toDashedHash(tag)] = tag;
});

const selectedTag = ref();

function selectTag(tag: string) {
  window.location.hash = `#${toDashedHash(tag)}`;
  selectedTag.value = tag;
}

onMounted(() => {
  const defaultHash = decodeURIComponent(window.location.hash?.slice(1));
  selectedTag.value = hashToTag[defaultHash] || ALL;

  selectTag(selectedTag.value);
});
</script>

<style module scoped>
.container {
  display: block;
}

.main {
  margin: 0 auto;
  max-width: 42rem;
  padding: 0 0 2rem;
}

.tagContainer {
  border-bottom: 1px solid var(--vp-c-divider);
  margin-bottom: 2rem;
  position: relative;
}

.transientBox {
  position: absolute;
  bottom: 0;
  height: 2rem;
  width: 100%;
  backdrop-filter: blur(5px);
  mask: linear-gradient(to bottom, transparent, var(--vp-c-bg) 20%);
  background: linear-gradient(to bottom,
      rgba(255, 255, 255, 0),
      var(--vp-c-bg));
}

.tagList {
  margin-left: -0.5rem;
  margin-right: -0.5rem;
  padding-top: 1px;
  padding-left: 1px;
  padding-right: 1px;
  padding-bottom: 1.2rem;
  max-height: calc(2.3rem * 5);
  overflow-y: scroll;
}
</style>
