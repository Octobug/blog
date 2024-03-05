<template>
  <Container :class="$style.container">
    <div :class="$style.main">
      <div :class="$style.sortContainer">
        <div :class="$style.sortList">
          <Badge
            v-for="sort of sorts"
            :key="sort"
            :text="sort"
            :number="postsBySort[sort].length"
            :link="true"
            :selected="sort === selectedSort"
            @click="selectSort(sort)"
          />
        </div>
      </div>
      <PostList
        date-format="ll"
        :post-list="postsBySort[selectedSort]"
      />
    </div>
  </Container>
</template>

<script
  lang="ts"
  setup
>
import { ref, onMounted } from "vue";
import { data as allPosts } from "../posts.data";
import { toDashedHash } from "../utils";
import Badge from "../components/Badge.vue";
import Container from "../components/Container.vue";
import PostList from "../components/PostList.vue";

const postsBySort = {};
allPosts.forEach((post) => {
  const sort = post.frontmatter.sort.toUpperCase();
  postsBySort[sort] = postsBySort[sort] || [];
  postsBySort[sort].push(post);
});

const ALL = "ALL";
const MISC = "MISCELLANEOUS";

postsBySort[ALL] = allPosts;
const miscPosts = postsBySort[MISC];
delete postsBySort[MISC];

const sorts = Object.keys(postsBySort).sort((a, b) => {
  if (postsBySort[a].length == postsBySort[b].length) {
    return a.localeCompare(b);
  }
  return postsBySort[b].length - postsBySort[a].length;
});
// set MISC as the last sort
sorts.push(MISC);
postsBySort[MISC] = miscPosts;

const hashToSort = {};
Object.keys(postsBySort).forEach(sort => {
  hashToSort[toDashedHash(sort)] = sort;
});

const selectedSort = ref();

function selectSort(sort: string) {
  window.location.hash = `#${toDashedHash(sort)}`;
  selectedSort.value = sort;
}

onMounted(() => {
  const defaultHash = window.location.hash?.slice(1);
  selectedSort.value = hashToSort[defaultHash] || ALL;

  selectSort(selectedSort.value);
});
</script>

<style
  module
  scoped
>
.container {
  display: block;
}

.main {
  margin: 0 auto;
  max-width: 42rem;
  padding: 0 0 2rem;
}

.sortContainer {
  border-bottom: 1px solid var(--vp-c-divider);
  margin-bottom: 2rem;
  position: relative;
}

.sortList {
  margin-left: -0.5rem;
  margin-right: -0.5rem;
  padding-top: 1px;
  padding-left: 1px;
  padding-right: 1px;
  padding-bottom: 1.2rem;
}
</style>
