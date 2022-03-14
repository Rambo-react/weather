import React from 'react';
import { useSelector } from 'react-redux';
import DateTime from './DateTime';
import Place from './Place';
import '../styles/info-panel.scss';

function InfoPanel() {
  const locality = useSelector((state) => state.geoposition.position);
  return (
    <div className="info-panel">
      <DateTime />
      {(locality) ? (
        <Place placeEn={locality.place.placeEn} countryEn={locality.country.countryEn} />
      )
        : (<h2>Нет данных</h2>)}
    </div>
  );
}

export default React.memo(InfoPanel);
