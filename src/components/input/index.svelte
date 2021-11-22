<script lang="ts">
  import { clsx } from '@/utils/helpers'

  export let className
</script>

<div class="wrap-input">
  <input
    on:keyup
    class={clsx('input', className)}
    type="text"
    {...$$restProps}
  />
</div>

<style lang="scss">
  @import './style.scss';
</style>
