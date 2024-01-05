<!-- Mostly copied from: https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/components/VPDocFooter.vue -->
<template>
  <nav
    v-if="control.prev?.link || control.next?.link"
    :class="$style.prevNext"
    class="pager-nav"
  >
    <div class="pager">
      <a
        v-if="control.prev?.link"
        :class="[$style.pagerLink, $style.prev]"
        :href="control.prev.link"
      >
        <span :class="$style.desc">
          {{ theme.docFooter?.prev || 'Previous page' }}
        </span>
        <span :class="$style.title">
          {{ control.prev.text }}
        </span>
      </a>
    </div>
    <div class="pager">
      <a
        v-if="control.next?.link"
        :class="[$style.pagerLink, $style.next]"
        :href="control.next.link"
      >
        <span :class="$style.desc">
          {{ theme.docFooter?.next || 'Next page' }}
        </span>
        <span :class="$style.title">
          {{ control.next.text }}
        </span>
      </a>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { useData, onContentUpdated } from "vitepress";
import { ref } from "vue";
import { data as allPosts } from "../posts.data";
import { findPostIndex } from "../utils";
import type { PageControl } from "../types/page-control";

const { page, theme } = useData();
const control = ref<PageControl>({});

function renderPrevNext() {
  const index = findPostIndex(allPosts, page.value);
  const prevPost = allPosts[index - 1];
  const nextPost = allPosts[index + 1];
  const prev = prevPost && {
    text: prevPost.frontmatter.title,
    link: prevPost.url
  };
  const next = nextPost && {
    text: nextPost.frontmatter.title,
    link: nextPost.url
  };
  control.value = { prev, next };
}

renderPrevNext();

onContentUpdated(() => {
  renderPrevNext();
});
</script>

<style module scoped>
.prevNext {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 1.5rem;
  display: grid;
  grid-row-gap: 8px;
}

@media (min-width: 640px) {
  .prevNext {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 16px;
  }
}

.pagerLink {
  display: block;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 11px 16px 13px;
  width: 100%;
  height: 100%;
  transition: border-color 0.25s;
}

.pagerLink:hover {
  border-color: var(--vp-c-brand-1);
}

.pagerLink.next {
  margin-left: auto;
  text-align: right;
}

.desc {
  display: block;
  line-height: 20px;
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.title {
  display: block;
  line-height: 20px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  transition: color 0.25s;
}
</style>
