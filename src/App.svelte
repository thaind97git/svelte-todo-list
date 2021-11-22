<script lang="ts">
  import { TodoStatus, statuses, todoStore } from '@/store/todo'

  import Input from '@/components/input/index.svelte'
  import TodoList from '@/components/todo/index.svelte'
  import { clsx, dispatchForCode } from './utils/helpers'
  import { removeItem, setItem, TODO_KEY } from './utils/local-storage'

  const TickImg = 'images/svgs/tick.svg'

  $: allTodo = $todoStore.items
  $: todoFiltered =
    activeStatus === 'All'
      ? allTodo
      : activeStatus === 'Active'
      ? allTodo.filter((todo) => !todo.isCompleted)
      : allTodo.filter((todo) => todo.isCompleted)
  $: activeStatus = $todoStore.currentStatus
  $: count = allTodo.length
  $: isAllCompleted = allTodo.every((todo) => todo.isCompleted)
  $: isSomeCompleted = allTodo.some((todo) => todo.isCompleted)

  const subscribeTodo = todoStore.subscribe(({ items }) => {
    if (items?.length) {
      setItem(TODO_KEY, items)
    } else {
      removeItem(TODO_KEY)
    }
  })

  const onKeyUp = (
    event: WindowEventMap['keyup'] & { target: HTMLInputElement }
  ) => {
    const { target } = event

    if (!target.value.trim()) {
      return
    }

    dispatchForCode(event, (key) => {
      if (key === 13 || key === 'Enter') {
        todoStore.addNewTodo(target.value)
        target.value = ''
      }
    })
  }

  const onClearCompleted = () => {
    todoStore.clearCompleted()
  }
  const onClickStatus = (status: TodoStatus) => {
    todoStore.updateStatus(status)
  }
  const onToggleAll = () => {
    todoStore.toggleCompleted()
  }
</script>

<main>
  <h1>Todo List</h1>
  <div class="wrap-todo">
    <div class="header">
      <div class="toggle-all">
        {#if count}
          <img
            class={isAllCompleted ? 'completed' : ''}
            on:click={onToggleAll}
            src={TickImg}
            alt=""
            width="20"
            height="20"
          />
        {/if}
      </div>
      <Input
        className="input-todo"
        on:keyup={onKeyUp}
        placeholder="What needs to be done ?"
      />
    </div>
    <TodoList todoList={todoFiltered} />
    {#if count}
      <footer id="footer">
        <div class="number">
          {count} item{count > 1 ? 's' : ''} left
        </div>
        <div class="status">
          {#each statuses as status}
            <p
              class={clsx({ active: activeStatus === status })}
              on:click={() => onClickStatus(status)}
            >
              {status}
            </p>
          {/each}
        </div>
        {#if isSomeCompleted}
          <div on:click={onClearCompleted} class="clear">Clear Completed</div>
        {/if}
      </footer>
    {/if}
  </div>
</main>

<style lang="scss">
  @import './App.scss';
</style>
