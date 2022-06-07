<script lang="ts" setup>
import type { AppContext } from "@netless/window-manager";
import { computed, inject, onUnmounted, ref } from "vue";

const context = inject<AppContext>("context");
if (!context) {
  throw new Error("no context");
}

const storage = context.createStorage("counter", { count: 0 });

const inner_count = ref(storage.state.count);

const dispose = storage.addStateChangedListener(() => {
  inner_count.value = storage.state.count;
});

onUnmounted(dispose);

const count = computed<number>({
  get: () => inner_count.value,
  set: (count) => storage.setState({ count }),
});

function increment() {
  count.value++;
}
</script>

<template>
  <button @click="increment">{{ count }}</button>
</template>

<style>
.app-vue {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
