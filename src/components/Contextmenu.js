import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  deletePermanentlyTodo,
  deleteTodo,
  recoverTodo,
} from '../redux/todoReducer';
import '../styles/context-menu.scss';

function Contextmenu({
  id,
  deleted,
  setAnimation,
  contextMenuOpen,
  setContextMenuOpen,
  startEdit,
}) {
  const dispatch = useDispatch();

  // dots
  function menuDotsClick() {
    setContextMenuOpen(!contextMenuOpen);
  }

  function menuDotsKeyDown(e) {
    if (e.keyCode === 13) {
      setContextMenuOpen(!contextMenuOpen);
    }
  }

  // edit
  function menuEditClick() {
    startEdit();
  }

  function menuEditKeyDown(e) {
    if (e.keyCode === 13) {
      startEdit();
    }
  }

  // delete
  function menuDeleteClick() {
    setAnimation('anim');
    if (deleted) {
      const ttt = setTimeout(() => { setAnimation(''); dispatch(deletePermanentlyTodo(id)); clearTimeout(ttt); }, 250);
    } else {
      const yyy = setTimeout(() => { setAnimation(''); dispatch(deleteTodo(id)); clearTimeout(yyy); }, 250);
    }
  }

  function menuDeleteKeyDown(e) {
    if (e.keyCode === 13) {
      setAnimation('anim');
      if (deleted) {
        const uuu = setTimeout(() => { setAnimation(''); dispatch(deletePermanentlyTodo(id)); clearTimeout(uuu); }, 250);
      } else {
        const iii = setTimeout(() => { setAnimation(''); dispatch(deleteTodo(id)); clearTimeout(iii); }, 250);
      }
    }
  }

  //  recover
  function menuRecoverClick() {
    if (deleted) {
      setAnimation('anim');
      const ooo = setTimeout(() => { setAnimation(''); dispatch(recoverTodo(id)); clearTimeout(ooo); }, 250);
    }
  }

  function menuRecoverKeyDown(e) {
    if (e.keyCode === 13 && deleted) {
      setAnimation('anim');
      const ppp = setTimeout(() => { setAnimation(''); dispatch(recoverTodo(id)); clearTimeout(ppp); }, 250);
    }
  }

  return (
    <div className={`contextmenu ${contextMenuOpen && 'opened'}`}>
      <div tabIndex={-1} className="button-contextmenu">
        <div className="contextmenu-icon contextmenu-icon-dots" tabIndex={-1} role="button" onClick={menuDotsClick} onKeyDown={menuDotsKeyDown}>
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M6 12c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm9 0c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm9 0c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z" /></svg>
        </div>
        <div className="contextmenu-icon contextmenu-icon-edit" tabIndex={-1} role="button" onClick={menuEditClick} onKeyDown={menuEditKeyDown} title="Edit.">
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M18.308 0l-16.87 16.873-1.436 7.127 7.125-1.437 16.872-16.875-5.691-5.688zm-15.751 21.444l.723-3.585 12.239-12.241 2.861 2.862-12.239 12.241-3.584.723zm17.237-14.378l-2.861-2.862 1.377-1.377 2.861 2.861-1.377 1.378z" /></svg>
        </div>
        <div className={`contextmenu-icon contextmenu-icon-delete ${deleted && 'deleted'}`} tabIndex={-1} role="button" onClick={menuDeleteClick} onKeyDown={menuDeleteKeyDown} title={`Delete${deleted ? ' permamently' : ''}.`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fillRule="evenodd" clipRule="evenodd"><path d="M19 24h-14c-1.104 0-2-.896-2-2v-17h-1v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2h-1v17c0 1.104-.896 2-2 2zm0-19h-14v16.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-16.5zm-9 4c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm-2-7h-4v1h4v-1z" /></svg>
        </div>
        <div className="contextmenu-icon contextmenu-icon-recover" tabIndex={-1} role="button" onClick={menuRecoverClick} onKeyDown={menuRecoverKeyDown} title="Recover.">
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M12 0c-3.31 0-6.291 1.353-8.459 3.522l-2.48-2.48-1.061 7.341 7.437-.966-2.489-2.488c1.808-1.808 4.299-2.929 7.052-2.929 5.514 0 10 4.486 10 10s-4.486 10-10 10c-3.872 0-7.229-2.216-8.89-5.443l-1.717 1.046c2.012 3.803 6.005 6.397 10.607 6.397 6.627 0 12-5.373 12-12s-5.373-12-12-12z" /></svg>
        </div>
      </div>
    </div>
  );
}

Contextmenu.propTypes = {
  id: PropTypes.number.isRequired,
  deleted: PropTypes.bool.isRequired,
  setAnimation: PropTypes.func.isRequired,
  contextMenuOpen: PropTypes.bool.isRequired,
  setContextMenuOpen: PropTypes.func.isRequired,
  startEdit: PropTypes.func.isRequired,
};

export default Contextmenu;
