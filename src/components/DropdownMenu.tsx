import React from 'react';
import { useDispatch } from 'react-redux';
import { resetDataListCities, setCoords } from '../redux/positionReducer';
import '../styles/dropdown-menu.scss';

type DropDownMenuProps = {
  selectionArea: Array<any>,
  setSearchTerm: (a:string)=> void,
};

function DropdownMenu({ selectionArea = [], setSearchTerm }: DropDownMenuProps) {
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
        <li key={el.placeFullName.placeNameEn} data-long={el.coords.longitude} data-lat={el.coords.latitude} className="search-drop-down-menu-item">
          {el.placeFullName.placeNameEn}
        </li>
      ))}
    </ul>
  );
}

export default DropdownMenu;
