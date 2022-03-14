import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useDebounce from '../redux/Hooks/useDebounce';
import { setCoords, getAllMatches, resetDataListCities } from '../redux/positionReducer';
import '../styles/search-panel.scss';

function SearchPanel() {
  const selectionArea = useSelector((state) => state.geoposition.listboxCityNames);
  const dispatch = useDispatch();
  // const input = React.createRef();
  // ============================================================================debounce
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  useEffect(
    () => {
      if (debouncedSearchTerm && debouncedSearchTerm.length > 1) {
        dispatch(getAllMatches(debouncedSearchTerm));
        setIsSearching(false);
      } else {
        dispatch(resetDataListCities());
        setIsSearching(false);
      }
    },
    [debouncedSearchTerm],
  );
  // ============================================================================end debounce

  console.log('render SearchPanel');
  console.log('isSearching', isSearching);

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

  function onChangeHandler(e) {
    setIsSearching(true);
    setSearchTerm(e.target.value);
  }

  function successPos(position) {
    console.log('navigation button', position);
    dispatch(setCoords(position.coords));
  }

  function errorPos() {
    alert('Failed to get location data.');
  }

  function navigationHandler() {
    if (!navigator.geolocation) {
      alert('Browser no support NAVIGATOR');
    } else {
      navigator.geolocation.getCurrentPosition(successPos, errorPos);
    }
  }

  return (
    <div className="search-block">
      <div className="search-panel">
        <div className="search-wrapper">
          <input value={searchTerm} className={`search ${isSearching && 'loading'} ${selectionArea.length > 0 && 'open'}`} placeholder="Search city" title="Enter the name of the city." onChange={(e) => onChangeHandler(e)} />
          {(selectionArea.length > 0) && (
            <ul tabIndex={0} role="menu" className="search-drop-down-menu" onClick={selectCity} onKeyDown={handleKeyDown}>
              {selectionArea.map((el) => (
                <li key={el.placeFullName.placeNameEn} long={el.coords.longitude} lat={el.coords.latitude} className="search-drop-down-menu-item">
                  {el.placeFullName.placeNameEn}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div tabIndex={-1} className="search-position" title="Find my location?" role="button" onClick={navigationHandler} onKeyDown={navigationHandler}>
          <div className="search-position-icon"> </div>
        </div>
      </div>
      <div className={`not-found ${(searchTerm && selectionArea.length < 1 && !isSearching) && 'open'}`}>
        Not found. To make search more precise put the city&apos;
        s name, comma, 2-letter country code (ISO 3166).
      </div>
    </div>
  );
}

export default SearchPanel;
