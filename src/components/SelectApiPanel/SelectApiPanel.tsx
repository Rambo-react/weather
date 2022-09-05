import React from 'react';
import { useDispatch } from 'react-redux';
import { setWeatherApi } from '../../redux/weatherReducer';
import './select-api.scss';

type SelectApiPanelType = {
  selectedApi: string,
};

function SelectApiPanel({ selectedApi }: SelectApiPanelType) {
  const dispatch = useDispatch();

  const changeApi: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(setWeatherApi(e.currentTarget.value));
  };

  return (
    <div className="select-api-wrapper">
      <div className="tabs-container">
        <div className="tabs" title="Сhoose api.">
          <label data-flag="first-api" htmlFor="first-api" className={`tab ${selectedApi === 'first' && 'label-checked'}`}>
            OpenWeathermap.org
            <input className="api-selector" type="radio" name="checkboxApi" checked={selectedApi === 'first'} value="first" id="first-api" onChange={(e) => changeApi(e)} />
          </label>
          <label data-flag="second-api" htmlFor="second-api" className={`tab ${selectedApi === 'second' && 'label-checked'}`}>
            Weatherbit.io
            <input className="api-selector" type="radio" name="checkboxApi" checked={selectedApi === 'second'} value="second" id="second-api" onChange={(e) => changeApi(e)} />
          </label>
          <span className="glider"> </span>
        </div>
      </div>
    </div>
  );
}

export default React.memo(SelectApiPanel);
