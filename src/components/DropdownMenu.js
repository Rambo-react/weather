import PropTypes from 'prop-types';
// import React from 'react';
import { useDispatch } from 'react-redux';
import { resetDataListCities, setCoords } from '../redux/positionReducer';
import '../styles/dropdown-menu.scss';

function DropdownMenu({ selectionArea, setSearchTerm }) {
  const dispatch = useDispatch();

  function changeCity(e) {
    const longitude = e.target.attributes.long.value;
    const latitude = e.target.attributes.lat.value;
    dispatch(setCoords({ longitude, latitude }));
    dispatch(resetDataListCities());
    setSearchTerm('');
  }

  function selectCity(e) {
    if (e.target.className === 'search-drop-down-menu-item') {
      changeCity(e);
    }
  }

  function handleKeyDown(e) {
    if (e.keyCode === 13) {
      changeCity(e);
    }
  }

  return (
    <ul tabIndex={0} role="menu" className="search-drop-down-menu" onClick={selectCity} onKeyDown={handleKeyDown}>
      {selectionArea.map((el) => (
        <li key={el.placeFullName.placeNameEn} long={el.coords.longitude} lat={el.coords.latitude} className="search-drop-down-menu-item">
          {el.placeFullName.placeNameEn}
        </li>
      ))}
    </ul>
  );
}

DropdownMenu.defaultProps = {
  selectionArea: [],
};

DropdownMenu.propTypes = {
  selectionArea: PropTypes.arrayOf(PropTypes.object),
  setSearchTerm: PropTypes.func.isRequired,
};

export default DropdownMenu;
