import React, {
  useCallback,
  useRef,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { toggleCompleteTodo } from '../redux/todoReducer';
import '../styles/task.scss';
import Contextmenu from './Contextmenu';

type TaskProps = {
  id: number,
  time: string,
  desc: string,
  completed: boolean,
  deleted: boolean,
  startEdit: () => void,
}

function Task({
  id, time, desc, completed, deleted,
  startEdit,
}: TaskProps) {
  const dispatch = useDispatch();
  const [contextMenuOpen, setContextMenuOpen] = useState(false);
  const [animation, setAnimation] = useState('');
  const inputText = useRef<HTMLDivElement>();

  const completeHandler = useCallback(() => {
    setAnimation('anim');
    const timerId = setTimeout(() => { setAnimation(''); dispatch(toggleCompleteTodo(id)); clearTimeout(timerId); }, 250);
  }, [id, dispatch]);

  return (
    <li className="task-wrapper">
      <div className="task-row">
        <div className="menu-wrapper">
          <Contextmenu
            id={id}
            deleted={deleted}
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
          onClick={completeHandler}
          onKeyDown={completeHandler}
        >
          {desc}
        </div>
      </div>
    </li>
  );
}

export default React.memo(Task);
