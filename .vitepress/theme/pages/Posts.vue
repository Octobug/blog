<template>
  <Container :class="$style.container">
    <div :class="$style.main">
      <div :class="$style.amountBox">
        <div :class="$style.amountBadge">
          All Posts
          <span :class="$style.number">{{ allPosts.length }}</span>
        </div>
      </div>
      <div
        v-for="year of years"
        :key="year"
      >
        <h1 :class="$style.year">
          <a
            :id="year"
            :href="`#${year}`"
          >{{ year }}</a>
        </h1>
        <div :class="$style.yearPosts">
          <PostList
            date-format="MMM DD"
            :post-list="postsByYear[year]"
          />
        </div>
      </div>
    </div>
  </Container>
</template>

<script lang="ts" setup>
import { data as allPosts } from "../posts.data";
import Container from "../components/Container.vue";
import PostList from "../components/PostList.vue";

const postsByYear = {};
allPosts.forEach((post) => {
  const year = post.frontmatter.datetime.slice(0, 4);
  postsByYear[year] = postsByYear[year] || [];
  postsByYear[year].push(post);
});
const years = Object.keys(postsByYear).sort().reverse();
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

.amountBox {
  color: var(--vp-c-default-1);
  text-align: right;
}

.amountBadge {
  background-color: var(--vp-c-default-soft);
  border-radius: 4px;
  padding: 0 0 0 7px;
  display: inline-block;
}

.number {
  color: var(--vp-c-text-3);
  background-color: var(--vp-c-default-soft);
  padding: 2px 7px 2px 6px;
  margin-left: 1px;
  border-radius: 0 4px 4px 0;
}

.year {
  color: var(--vp-c-neutral);
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 2rem;
}

.yearPosts {
  padding-left: 1rem;
}
</style>
