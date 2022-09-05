import React from 'react';
import { useSelector } from 'react-redux';
import DateTime from '../DateTime/DateTime';
import Place from '../Place/Place';
import './info-panel.scss';
import { RootState } from '../../redux/store';

function InfoPanel() {
  const locality = useSelector((state: RootState) => state.geoposition.position);
  return (
    <div className="info-panel">
      <DateTime />
      {(locality) ? (
        <Place placeEn={locality.place.placeEn} countryEn={locality.country.countryEn} />
      )
        : (<h2>No data</h2>)}
    </div>
  );
}

export default React.memo(InfoPanel);
