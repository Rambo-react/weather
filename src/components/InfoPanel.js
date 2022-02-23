import React from 'react';
import { useSelector } from 'react-redux';
import DateTime from './DateTime';
import Place from './Place';

function InfoPanel() {
  const locality = useSelector((state) => state.geoposition.position);
  console.log('InfoPanel locality:', locality);
  return (
    <div>
      <DateTime />
      {(locality) ? (
        <Place placeEn={locality.place.placeEn} countryEn={locality.country.countryEn} />
      )
        : (<h2>Нет данных</h2>)}
    </div>
  );
}

export default React.memo(InfoPanel);
