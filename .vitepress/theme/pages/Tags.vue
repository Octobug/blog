<template>
  <Container :class="$style.container">
    <div :class="$style.main">
      <div :class="$style.tagList">
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
  const defaultHash = window.location.hash?.slice(1);
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

.tagList {
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
  margin-bottom: 2rem;
}
</style>
