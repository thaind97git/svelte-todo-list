<script lang="ts">
  import { afterUpdate } from 'svelte'
  import { todoStore } from '@/store/todo'
  import { clsx, ClickOutside, dispatchForCode } from '@/utils/helpers'

  const CheckImg = 'images/svgs/circle.svg'
  const CheckCompleteImg = 'images/svgs/check-complete.svg'
  const CancelImg = 'images/svgs/cancel.svg'

  export let todo: TodoItem
  let showInput: boolean = false
  let inputRef: HTMLElement

  afterUpdate(() => {
    if (showInput === true) {
      inputRef.focus()
    }
  })

  const handleRemove = () => {
    todoStore.onRemove(todo)
  }
  const onItemClicked = () => {
    todoStore.toggleCompleted(todo.id)
  }

  const onDbClick = () => {
    showInput = true
  }

  const onClickOutside = () => {
    showInput = false
  }

  const onKeyUp = (event: KeyboardEvent) => {
    const target = event.target as HTMLInputElement
    if (!target.value.trim()) {
      return
    }

    dispatchForCode(event, (key) => {
      if ([13, 'Enter', 'Escape'].includes(key)) {
        todoStore.editTitle(todo.id, target.value)
        showInput = false
      }
    })
  }
</script>

<div class={clsx('todo-item', { completed: todo.isCompleted })}>
  <img
    class={clsx('check-img', {
      opacity: todo.isCompleted,
      hidden: showInput
    })}
    on:click={onItemClicked}
    alt=""
    src={todo.isCompleted ? CheckCompleteImg : CheckImg}
    width={32}
    height={32}
  />
  <div
    class="todo-value"
    on:dblclick={onDbClick}
    on:clickOutside={onClickOutside}
    use:ClickOutside
  >
    <p id={todo.id} class="title">
      {todo.title}
    </p>
    <!-- svelte-ignore a11y-autofocus -->
    <input
      class={clsx('edit', { open: showInput })}
      bind:value={todo.title}
      on:keyup={onKeyUp}
      autofocus={showInput}
      bind:this={inputRef}
    />
  </div>
  <img
    class={clsx('cancel-img', { hidden: showInput })}
    on:click={handleRemove}
    alt=""
    src={CancelImg}
    width={15}
    height={15}
  />
</div>

<style lang="scss">
  @import './style.scss';
</style>
