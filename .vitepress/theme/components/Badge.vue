<template>
  <a
    :href="link ? `#${toDashedHash(text)}` : ''"
    :class="[selected && 'active', link && 'link', $style.badge]"
  >
    <div :class="$style.box">
      <span :class="$style.text">{{ text }}</span>
      <span
        class="digit"
        :class="$style.number"
      >
        {{ number }}
      </span>
    </div>
  </a>
</template>

<script lang="ts" setup>
import { toDashedHash } from "../utils";

defineProps({
  text: {
    type: String,
    default: ""
  },
  number: {
    type: Number,
    default: 0
  },
  selected: {
    type: Boolean,
    default: false
  },
  link: {
    type: Boolean,
    defaul: false
  }
});
</script>

<style scoped>
.link {
  margin: 0 0.5rem;
}

.link:hover,
a.active {
  color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 1px var(--vp-c-brand-2);
  background-color: var(--vp-c-default-soft);
}

.link:hover .digit,
a.active .digit {
  color: var(--vp-c-default-3);
  background-color: var(--vp-c-brand-2);
}
</style>

<style module scoped>
.badge {
  color: var(--vp-c-brand-soft);
  display: inline-block;
  border-radius: 4px;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.box {
  font-size: 14px;
  background-color: var(--vp-c-default-soft);
  margin: 0;
}

.text {
  padding: 0;
  margin: 0;
  padding-left: 10px;
  padding-right: 9px;
}

.number {
  display: inline-block;
  color: var(--vp-c-brand-3);
  background-color: var(--vp-c-default-soft);
  padding-top: 1px;
  padding-bottom: 1px;
  padding-left: 9px;
  padding-right: 10px;
  margin: 0
}
</style>
