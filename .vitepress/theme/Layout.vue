<template>
  <Layout>
    <template #doc-before>
      <!-- <Category /> -->
    </template>
    <template #doc-after>
      <!-- <Comments /> -->
    </template>
  </Layout>
</template>

<script lang="ts" setup>
import DefaultTheme from "vitepress/theme";
const { Layout } = DefaultTheme;
</script>

<style scoped>
</style>
