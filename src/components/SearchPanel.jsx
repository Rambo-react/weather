import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useDebounce from '../redux/Hooks/useDebounce';
import { setCoords, getAllMatches, resetDataListCities } from '../redux/positionReducer.ts';
import '../styles/search-panel.scss';
import DropdownMenu from './DropdownMenu';

function SearchPanel({ setNotification }) {
  const selectionArea = useSelector((state) => state.geoposition.listboxCityNames);
  const dispatch = useDispatch();
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
    [debouncedSearchTerm, dispatch],
  );
  // ============================================================================end debounce

  function onChangeHandler(e) {
    setIsSearching(true);
    setSearchTerm(e.target.value);
  }

  function inputKeyDownHandler(e) {
    if (e.keyCode === 27) {
      setSearchTerm('');
    }
  }

  function navigationHandler() {
    function successPos(position) {
      dispatch(setCoords(position.coords));
    }
    function errorPos() {
      setNotification('Location unavailable. Enter the name of the city in the search bar.');
    }
    if (!navigator.geolocation) {
      setNotification('Browser no support "navigator". Enter the name of the city in the search bar.');
    } else {
      navigator.geolocation.getCurrentPosition(successPos, errorPos);
    }
  }

  function onBlurHandler(e) {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setSearchTerm('');
    }
  }

  return (
    <div tabIndex={-1} className="search-block not-blur" onBlur={(e) => onBlurHandler(e)}>
      <div className="search-panel">
        <div className="search-wrapper">
          <input value={searchTerm} className={`search ${isSearching && 'loading'} ${selectionArea.length > 0 && 'open'}`} placeholder="Search city" title="Enter the name of the city." onChange={(e) => onChangeHandler(e)} onKeyDown={inputKeyDownHandler} />
          {(selectionArea.length > 0)
            && (
              <DropdownMenu
                selectionArea={selectionArea}
                setSearchTerm={(val) => setSearchTerm(val)}
              />
            )}
        </div>
        <div tabIndex={0} className="search-position" title="Find my location?" role="button" onClick={navigationHandler} onKeyDown={navigationHandler}>
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

SearchPanel.propTypes = {
  setNotification: PropTypes.func.isRequired,
};

export default SearchPanel;
