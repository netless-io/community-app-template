<template>
  <button @click="count++">{{ count }}</button>
</template>

<script lang="ts" setup>
import type { AppContext } from "@netless/window-manager";

import { computed, inject, onMounted, ref, watchEffect } from "vue";

const context = inject<AppContext>("context");
if (!context) throw new Error("must call provide('context') before mount App");

const storage = context.createStorage("counter", { count: 0 });
const real_count = ref(storage.state.count);

const count = computed<number>({
  get: () => real_count.value,
  set: (count) => storage.setState({ count }),
});

onMounted(() =>
  storage.addStateChangedListener(() => {
    real_count.value = storage.state.count;
  })
);

watchEffect(() => {
  console.log("App.vue: count =", count.value);
});
</script>
