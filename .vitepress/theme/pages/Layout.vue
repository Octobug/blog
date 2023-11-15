<template>
  <Layout>
    <template #doc-before>
      <PostHeader />
    </template>
    <template #doc-after>
      <!-- <Comments /> -->
      <PrevNext />
    </template>
  </Layout>
</template>

<script lang="ts" setup>
import DefaultTheme from "vitepress/theme";
import PostHeader from "../components/PostHeader.vue";
import PrevNext from "../components/PrevNext.vue";

const { Layout } = DefaultTheme;
</script>

<style scoped>
</style>
