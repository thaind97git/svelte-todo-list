interface TodoItem {
  id: string
  title: string
  isCompleted: boolean
}

interface WindowEventMap
  extends GlobalEventHandlersEventMap,
    WindowEventHandlersEventMap {}
