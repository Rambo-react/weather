const ADD_TODO = 'ADD_TODO';
const TOGGLE_COMPLETE_TODO = 'TOGGLE_COMPLETE_TODO';
const DELETE_TODO = 'DELETE_TODO';
const RECOVER_TODO = 'RECOVER_TODO';
const EDIT_TODO = 'EDIT_TODO';
const TOGGLE_DISPLAY_COMPLITED = 'TOGGLE_DISPLAY_COMPLITED';
const TOGGLE_DISPLAY_DELETED = 'TOGGLE_DISPLAY_DELETED';
const DELETE_PERMANENTLY = 'DELETE_PERMANENTLY';

const defaultState = {
  todoList: [],
  displayCompleted: false,
  displayDeleted: false,
};

const todoReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todoList: [...state.todoList, { ...action.payload, completed: false, deleted: false }],
      };
    case TOGGLE_COMPLETE_TODO:
      return {
        ...state,
        todoList: state.todoList.map((el) => (
          el.id === action.idTodo ? { ...el, completed: !el.completed } : el)),
      };
    case DELETE_TODO:
      return {
        ...state,
        todoList: state.todoList.map((el) => (
          el.id === action.idTodo ? { ...el, deleted: true } : el)),
      };
    case RECOVER_TODO:
      return {
        ...state,
        todoList: state.todoList.map((el) => (
          el.id === action.idTodo ? { ...el, deleted: false } : el)),
      };
    case EDIT_TODO:
      return {
        ...state,
        todoList: state.todoList.map((el) => (
          el.id === action.payload.id ? {
            id: el.id,
            ...action.payload,
            completed: el.completed,
            deleted: el.deleted,
          } : el)),
      };
    case DELETE_PERMANENTLY: {
      return {
        ...state,
        todoList: state.todoList.filter((el) => (el.id !== action.idTodo)),
      };
    }
    case TOGGLE_DISPLAY_COMPLITED:
      return {
        ...state,
        displayCompleted: !state.displayCompleted,
      };
    case TOGGLE_DISPLAY_DELETED:
      return {
        ...state,
        displayDeleted: !state.displayDeleted,
      };
    default: return state;
  }
};

export const addTodo = (payload) => ({ type: ADD_TODO, payload });
export const toggleCompleteTodo = (idTodo) => ({ type: TOGGLE_COMPLETE_TODO, idTodo });
export const deleteTodo = (idTodo) => ({ type: DELETE_TODO, idTodo });
export const recoverTodo = (idTodo) => ({ type: RECOVER_TODO, idTodo });
export const editTodo = (payload) => ({ type: EDIT_TODO, payload });
export const deletePermanentlyTodo = (idTodo) => ({ type: DELETE_PERMANENTLY, idTodo });

export const toggleDisplayComplited = () => ({ type: TOGGLE_DISPLAY_COMPLITED });
export const toggleDisplayDeleted = () => ({ type: TOGGLE_DISPLAY_DELETED });

export default todoReducer;
