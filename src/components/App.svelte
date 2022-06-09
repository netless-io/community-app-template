<script lang="ts">
  import type { AppContext } from "@netless/window-manager";
  import { connectStorage } from "./helpers";

  export let context: AppContext;

  let storage = context.createStorage("counter", { count: 0 });

  let count = connectStorage(storage, "count");

  $: console.log("App.svelte: count =", $count);
</script>

<button on:click={() => $count++}>{$count}</button>
