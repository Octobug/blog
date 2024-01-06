<template>
  <Layout>
    <template #doc-footer-before>
      <Annotations />
    </template>
    <template #doc-after>
      <PrevNext />
      <Comments />
    </template>
  </Layout>
</template>

<script lang="ts" setup>
import DefaultTheme from "vitepress/theme";
import Annotations from "../components/Annotations.vue";
import PrevNext from "../components/PrevNext.vue";
import Comments from "../components/Comments.vue";

const { Layout } = DefaultTheme;
</script>

<style scoped>
</style>
