import PropTypes from 'prop-types';
import {
  useCallback,
  // useEffect,
  useRef,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { toggleCompleteTodo } from '../redux/todoReducer';
import '../styles/task.scss';
import Contextmenu from './Contextmenu';

function Task({
  id, time, desc, completed, deleted,
  startEdit,
}) {
  const dispatch = useDispatch();
  const [contextMenuOpen, setContextMenuOpen] = useState(false);
  const [animation, setAnimation] = useState('');
  const inputText = useRef();

  const completeHandler = useCallback(() => {
    setAnimation('anim');
    const timerId = setTimeout(() => { setAnimation(''); dispatch(toggleCompleteTodo(id)); clearTimeout(timerId); }, 250);
  }, [id, dispatch]);

  // useEffect(() => {
  //   console.log('useEffect в Task');
  //      const timerId = setTimeout(() => completeHandler(), 250);

  // }, [id, completeHandler]);

  return (
    <li className="task-wrapper">
      <div className="task-row">
        <div className="menu-wrapper">
          <Contextmenu
            id={id}
            time={time}
            desc={desc}
            completed={completed}
            deleted={deleted}
            inputText={inputText}
            setAnimation={(val) => setAnimation(val)}
            contextMenuOpen={contextMenuOpen}
            setContextMenuOpen={(val) => setContextMenuOpen(val)}
            startEdit={() => startEdit()}
          />
          <div className={`task-time ${completed && 'completed'} ${deleted && 'deleted'} ${contextMenuOpen && 'opened'}`}>{time}</div>
        </div>
        <div
          ref={inputText}
          className={`task-desc ${completed && 'completed'} ${deleted && 'deleted'} ${animation}`}
          title="Left Click - mark as done."
          tabIndex={-1}
          role="button"
          // onClick={timerId}
          onClick={completeHandler}
          onKeyDown={completeHandler}
        >
          {desc}
        </div>
      </div>
    </li>
  );
}

Task.propTypes = {
  id: PropTypes.number.isRequired,
  time: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  deleted: PropTypes.bool.isRequired,
  startEdit: PropTypes.func.isRequired,
};

export default Task;
