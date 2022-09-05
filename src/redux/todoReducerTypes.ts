import {
  ADD_TODO,
  TOGGLE_COMPLETE_TODO,
  DELETE_TODO,
  RECOVER_TODO,
  EDIT_TODO,
  TOGGLE_DISPLAY_COMPLITED,
  TOGGLE_DISPLAY_DELETED,
  DELETE_PERMANENTLY,
} from './todoReducer';

export type todoType = {
  id: number,
  time: string
  date: string
  desc: string
  completed: boolean
  deleted: boolean
}

export type editPayloadType = {
  id: number,
  time: string,
  date: string,
  desc: string,
}

export type defaultStateTodoType = {
  todoList: Array<todoType>,
  displayCompleted: boolean,
  displayDeleted: boolean,
};

// actions

interface IaddTodo {
  type: typeof ADD_TODO,
  payload: todoType
}

interface ItoggleCompleteTodo {
  type: typeof TOGGLE_COMPLETE_TODO,
  idTodo: number
}

interface IdeleteTodo {
  type: typeof DELETE_TODO,
  idTodo: number
}

interface IrecoverTodo {
  type: typeof RECOVER_TODO,
  idTodo: number
}

interface IeditTodo {
  type: typeof EDIT_TODO,
  payload: editPayloadType
}

interface IdeletePermanentlyTodo {
  type: typeof DELETE_PERMANENTLY,
  idTodo: number
}

interface ItoggleDisplayComplited {
  type: typeof TOGGLE_DISPLAY_COMPLITED
}

interface ItoggleDisplayDeleted {
  type: typeof TOGGLE_DISPLAY_DELETED
}

export type TodoActionTypes =
  IaddTodo
  | ItoggleCompleteTodo
  | IdeleteTodo
  | IrecoverTodo
  | IeditTodo
  | IdeletePermanentlyTodo
  | ItoggleDisplayComplited
  | ItoggleDisplayDeleted;
