import React, {
  ChangeEvent, KeyboardEvent, useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useDebounce from '../../redux/Hooks/useDebounce';
import { setCoords, getAllMatches, resetDataListCities } from '../../redux/positionReducer';
import { RootState } from '../../redux/store';
import './search-panel.scss';
import DropdownMenu from '../DropDownMenu/DropdownMenu';
import { CoordsNavigatorType } from '../../redux/positionTypes';

type SearchPanelPropsType = {
  setNotification: (a: string) => void
}

function SearchPanel({ setNotification }: SearchPanelPropsType) {
  const selectionArea = useSelector((state: RootState) => state.geoposition.listboxCityNames);
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

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setIsSearching(true);
    setSearchTerm(e.target.value);
  };

  const inputKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 27) {
      setSearchTerm('');
    }
  };

  const navigationHandler = () => {
    const successPos = (position: CoordsNavigatorType) => {
      dispatch(setCoords(position.coords));
    };
    const errorPos = () => {
      setNotification('Location unavailable. Enter the name of the city in the search bar.');
    };
    if (!navigator.geolocation) {
      setNotification('Browser no support "navigator". Enter the name of the city in the search bar.');
    } else {
      navigator.geolocation.getCurrentPosition(successPos, errorPos);
    }
  };

  const onBlurHandler = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setSearchTerm('');
    }
  };

  return (
    <div tabIndex={-1} className="search-block not-blur" onBlur={onBlurHandler}>
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

export default SearchPanel;
