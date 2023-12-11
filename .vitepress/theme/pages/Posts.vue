<template>
  <Container :class="$style.container">
    <div :class="$style.main">
      <div :class="$style.badgeBox">
        <Badge
          text="ALL"
          :number="allPosts.length"
          :link="false"
          :class="$style.disabled"
          :selected="true"
        />
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
import Badge from "../components/Badge.vue";
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

.badgeBox {
  text-align: right;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
  margin-bottom: 2rem;
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
