<template>
  <Layout>
    <template #doc-before>
      <PostElements />
    </template>
    <template #doc-after>
      <!-- <Comments /> -->
      <PrevNext />
    </template>
  </Layout>
</template>

<script lang="ts" setup>
import DefaultTheme from "vitepress/theme";
import PostElements from "../components/PostElements.vue";
import PrevNext from "../components/PrevNext.vue";

const { Layout } = DefaultTheme;
</script>

<style scoped>
</style>
