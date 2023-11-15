<template>
  <ul :class="$style.extra">
    <li :class="$style.extraitem">
      <svg viewBox="0 0 16 16">
        <path
          d="m12.596 11.596-3.535 3.536a1.5 1.5 0 0 1-2.122 0l-3.535-3.536a6.5 6.5 0 1 1 9.192-9.193 6.5 6.5 0 0 1 0 9.193Zm-1.06-8.132v-.001a5 5 0 1 0-7.072 7.072L8 14.07l3.536-3.534a5 5 0 0 0 0-7.072ZM8 9a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 9Z"
          fill="var(--vp-c-text-2)"
        />
      </svg>
      {{ location }}
    </li>
    <li :class="[$style.extraitem, $style.timezone]">
      <svg viewBox="0 0 16 16">
        <path
          d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm7-3.25v2.992l2.028.812a.75.75 0 0 1-.557 1.392l-2.5-1A.751.751 0 0 1 7 8.25v-3.5a.75.75 0 0 1 1.5 0Z"
          fill="var(--vp-c-text-2)"
        />
      </svg>
      {{ `${now.HHmm} (${now.UTCZ})` }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
import moment from "moment-timezone";
import { useData } from "vitepress";
const { theme } = useData();
const { location, timezone } = theme.value;
const nowWithTZ = moment().tz(timezone);
const now = {
  HHmm: nowWithTZ.format("HH:mm"),
  UTCZ: nowWithTZ.format("UTC Z")
};
</script>

<style scoped module>
.extra {
  padding-left: 1.2rem;
  text-align: left;
  color: var(--vp-c-text-2);
}

.extraitem {
  font-size: 13px;
}

.extraitem svg {
  float: left;
  width: 12px;
  margin-top: 5.2px;
  margin-left: -18px;
}

.timezone {
  font-size: 12.8px;
}

.timezone svg {
  width: 10.8px;
  margin-top: 6.2px;
  margin-left: -17.2px;
}
</style>
