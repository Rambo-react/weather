import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setWeatherApi } from '../reducers/weatherReducer';

function SelectApiPanel({ selectedApi }) {
  const dispatch = useDispatch();

  function changeApi(e) {
    dispatch(setWeatherApi(e.currentTarget.value));
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label htmlFor="first-api">
        OpenWeatherMap
        <input type="radio" name="checkboxApi" checked={selectedApi === 'first'} value="first" id="first-api" onChange={(e) => changeApi(e)} />
      </label>
      <label htmlFor="second-api">
        stormglass
        <input type="radio" name="checkboxApi" checked={selectedApi === 'second'} value="second" id="second-api" onChange={(e) => changeApi(e)} />
      </label>
    </div>
  );
}

SelectApiPanel.propTypes = {
  selectedApi: PropTypes.string.isRequired,
};

export default React.memo(SelectApiPanel);
