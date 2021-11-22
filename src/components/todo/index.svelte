<script lang="ts">
  import Item from './item/index.svelte'

  export let todoList: Array<TodoItem> = []
</script>

<div class="todo-list">
  {#each todoList as todo}
    <Item {todo} />
    <!-- {:else}
    <div>Empty todo</div> -->
  {/each}
</div>

<style>
</style>
