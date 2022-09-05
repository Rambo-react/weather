import React from 'react';
import { useDispatch } from 'react-redux';
import { resetDataListCities, setCoords } from '../../redux/positionReducer';
import './dropdown-menu.scss';

type DropDownMenuPropsType = {
  selectionArea: Array<any>,
  setSearchTerm: (a: string) => void,
};

function DropdownMenu({ selectionArea = [], setSearchTerm }: DropDownMenuPropsType) {
  const dispatch = useDispatch();

  const changeCity = (targetLi: any): void => {
    const longitude = targetLi.attributes['data-long'].value;
    const latitude = targetLi.attributes['data-lat'].value;
    dispatch(setCoords({ longitude, latitude }));
    dispatch(resetDataListCities());
    setSearchTerm('');
  };

  const selectCity = (e: any): void => {
    const targetLi = e.target;
    if (targetLi.tagName === 'LI') {
      changeCity(targetLi);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLUListElement>): void => {
    if (e.keyCode === 13) {
      changeCity(e);
    }
  };

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
