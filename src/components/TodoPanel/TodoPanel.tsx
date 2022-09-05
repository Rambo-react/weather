import './todo-panel.scss';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import React, {
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  addTodo,
  editTodo,
  toggleDisplayComplited,
  toggleDisplayDeleted,
} from '../../redux/todoReducer';
import Task from '../Task/Task';
import Checkbox from '../Checkbox/Checkbox';
import { RootState } from '../../redux/store';
import { todoType } from '../../redux/todoReducerTypes';

function ToDoPanel() {
  const dispatch = useDispatch();
  const [opened, setHide] = useState('');
  const [mode, setMode] = useState('Add task');
  const [tempId, setTempId] = useState(0);
  const inputDate = useRef() as React.MutableRefObject<HTMLInputElement>;
  const inputTime = useRef() as React.MutableRefObject<HTMLInputElement>;
  const inputText = useRef() as React.MutableRefObject<HTMLInputElement>;
  const buttonNewTask = useRef() as React.MutableRefObject<HTMLInputElement>;
  const today = moment().format('YYYY-MM-DD');
  const displayCompleted = useSelector((state: RootState) => state.todo.displayCompleted);
  const displayDeleted = useSelector((state: RootState) => state.todo.displayDeleted);
  const todoList = useSelector((state: RootState) => state.todo.todoList);

  const todo = useMemo(
    () => todoList.filter((el) => {
      if (el.date === today) {
        if (displayCompleted === false && el.completed === true) {
          return false;
        }
        if (displayDeleted === false && el.deleted === true) {
          return false;
        }
        return true;
      }
      return false;
    })
      .sort((a, b) => (a.time > b.time ? 1 : -1)),
    [todoList, today, displayCompleted, displayDeleted],
  );

  // success
  const handleClickSuccess = () => {
    if (mode === 'Add task') {
      dispatch(addTodo({
        id: +new Date(),
        time: inputTime.current.value,
        date: inputDate.current.value,
        desc: inputText.current.value,
        completed: false,
        deleted: false,
      }));
    } else if (mode === 'Edit task') {
      dispatch(editTodo({
        id: tempId,
        time: inputTime.current.value,
        date: inputDate.current.value,
        desc: inputText.current.value,
      }));
      setTempId(0);
    }
    inputDate.current.value = '';
    inputTime.current.value = '';
    inputText.current.value = '';
    setHide('');
    inputText.current.focus();
    inputText.current.blur();
  };

  const handleKeyDownSuccess = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode === 13) {
      handleClickSuccess();
    }
  };

  // cancel
  const handleClickCancel = () => {
    setHide('');
    inputDate.current.value = '';
    inputTime.current.value = '';
    inputText.current.value = '';
  };

  const handleKeyDownCancel = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode === 13) {
      handleClickCancel();
      inputText.current.focus();
      inputText.current.blur();
    }
  };

  // add new
  const openAddMenu = () => {
    setHide('opened');
    setMode('Add task');
    inputDate.current.value = moment().format('YYYY-MM-DD');
    inputTime.current.value = moment().format('HH:mm');
    // inputText.current.focus();
  };

  const handleClickOpenMenu = () => {
    openAddMenu();
  };

  const handleKeyDownOpenMenu = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode === 13) {
      openAddMenu();
    }
  };

  //  start edit
  const startEdit = (task: todoType) => {
    setHide('opened');
    setMode('Edit task');
    setTempId(task.id);
    inputDate.current.value = task.date;
    inputTime.current.value = task.time;
    inputText.current.value = task.desc;
  };

  // display settings
  const displayComplitedChange = () => {
    dispatch(toggleDisplayComplited());
  };

  const displayDeletedChange = () => {
    dispatch(toggleDisplayDeleted());
  };

  // input
  const onKeyDownInput = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode === 13) {
      handleClickSuccess();
    } else if (e.keyCode === 27) {
      handleClickCancel();
    }
  };

  return (
    <div className="todo-panel">
      <div>
        <div className="todo-panel-header">
          <div className="todo-tasks-count">
            {`Tasks: ${todo.length}`}
          </div>
          <Checkbox val={displayCompleted} onChangeHandler={() => displayComplitedChange()} text="completed" id="completed" />
          <Checkbox val={displayDeleted} onChangeHandler={() => displayDeletedChange()} text="deleted" id="deleted" />
        </div>

        <ul className="todo-list">
          {todo.map((el) => (
            <Task
              key={el.id}
              id={el.id}
              time={el.time}
              desc={el.desc}
              completed={el.completed}
              deleted={el.deleted}
              startEdit={() => startEdit(el)}
            />
          ))}
        </ul>
      </div>

      <div className="edit-panel-wrapper">
        <div ref={buttonNewTask} tabIndex={opened ? -1 : 0} className={`todo-add ${opened}`} title="Add new task." role="button" onClick={handleClickOpenMenu} onKeyDown={handleKeyDownOpenMenu}>
          <div>
            <svg className="add-icon" viewBox="0 0 24 24" width="14px" height="14px" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M11 11v-11h1v11h11v1h-11v11h-1v-11h-11v-1h11z" /></svg>
          </div>
          <span>New task</span>
        </div>
        <div className={`todo-edit-panel ${opened}`}>
          <div tabIndex={opened ? 0 : -1} role="button" className="todo-cancel" onClick={handleClickCancel} onKeyDown={handleKeyDownCancel}>
            <div>
              <svg className="cancel-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="14px" height="14px"><path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z" /></svg>
            </div>
            <span>Cancel</span>
          </div>
          <div tabIndex={opened ? 0 : -1} role="button" className="todo-accept" onClick={handleClickSuccess} onKeyDown={handleKeyDownSuccess}>
            <div>
              <svg className="accept-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16px" height="16px"><path d="M 20.292969 5.2929688 L 9 16.585938 L 4.7070312 12.292969 L 3.2929688 13.707031 L 9 19.414062 L 21.707031 6.7070312 L 20.292969 5.2929688 z" /></svg>
            </div>
            <span>{mode}</span>
          </div>
          <input tabIndex={opened ? 0 : -1} ref={inputText} type="text" maxLength={250} className="todo-text" placeholder="Enter task" onKeyDown={onKeyDownInput} />
          <input tabIndex={opened ? 0 : -1} ref={inputDate} type="date" min={today} className="todo-date" onKeyDown={onKeyDownInput} id="todo-date" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" />
          <input tabIndex={opened ? 0 : -1} ref={inputTime} type="time" className="todo-time" onKeyDown={onKeyDownInput} id="todo-time" />
        </div>
      </div>
    </div>
  );
}

export default React.memo(ToDoPanel);
