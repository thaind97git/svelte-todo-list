<script lang="ts">
  import { todoStore } from '@/store/todo'

  import { clsx } from '@/utils/helpers'

  const CheckCompleteImg = 'images/svgs/check.svg'
  const CheckImg = 'images/svgs/check-complete.svg'
  const CancelImg = 'images/svgs/cancel.svg'

  export let todo: TodoItem

  const handleRemove = () => {
    todoStore.onRemove(todo)
  }
  const onItemClicked = () => {
    todoStore.toggleCompleted(todo.id)
  }
</script>

<div class={clsx('todo-item', { completed: todo.isCompleted })}>
  <img
    class={clsx('check-img', { opacity: todo.isCompleted })}
    on:click={onItemClicked}
    alt=""
    src={!todo.isCompleted ? CheckCompleteImg : CheckImg}
    width={32}
    height={32}
  />
  <p class="title">{todo.title}</p>
  <img
    class="cancel-img"
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
