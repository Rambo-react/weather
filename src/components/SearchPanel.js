import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCoords, getAllMatches, resetDataListCities } from '../redux/positionReducer';

function SearchPanel() {
  const weatherIsFetching = useSelector((state) => state.weather.isFetching);
  const positionIsFetching = useSelector((state) => state.geoposition.isFetchingPosition);
  const selectionArea = useSelector((state) => state.geoposition.listboxCityNames);
  const dispatch = useDispatch();
  const input = React.createRef();

  console.log('render SearchPanel');

  function setWeather(searchText) {
    console.log('Нажали на кнопку поиска:', searchText);
    dispatch(getAllMatches(searchText));
    // dispatch(getWeatherFromApi(coords, selectedApi));
  }

  function selectCity(coordsFromList) {
    console.log('selectCity:', coordsFromList);
    dispatch(setCoords(coordsFromList));
    dispatch(resetDataListCities());
  }
  function handleKeyDown(e, coordsFromList) {
    if (e.keyCode === 13) {
      console.log('handleKeyDown:', coordsFromList);
      dispatch(setCoords(coordsFromList));
      dispatch(resetDataListCities());
    }
  }

  function clearSearchList() {
    dispatch(resetDataListCities());
  }

  return (
    <div>
      <input ref={input} placeholder="Enter city name" />
      <button disabled={weatherIsFetching && positionIsFetching} type="submit" onClick={() => { setWeather(input.current.value); }}>set from NET weather</button>
      <button disabled={weatherIsFetching && positionIsFetching} type="submit" onClick={() => { clearSearchList(); }}>clear search List</button>
      <div>
        {(selectionArea.length > 0) ? (
          selectionArea.map((el) => (
            (
              <div role="button" tabIndex="0" key={el.placeFullName.placeNameEn} style={{ cursor: 'pointer', margin: '10px 0', border: '4px solid green' }} onClick={() => selectCity(el.coords)} onKeyDown={(e) => handleKeyDown(e, el.coords)}>
                {el.placeFullName.placeNameEn}
              </div>
            )
          ))
        ) : (
          <div> ЗДЕСЬ БУДУТ ОТОБРАЖАТЬСЯ РЕЗУЛЬТАТЫ ПОИСКА </div>
        )}
      </div>
    </div>
  );
}

export default SearchPanel;
