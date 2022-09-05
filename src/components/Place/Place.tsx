import React from 'react';
import './place.scss';

type PlaceProps = {
  placeEn: string,
  countryEn: string,
};

function Place({ placeEn = 'no city name', countryEn = 'no country name' }: PlaceProps) {
  return (
    <div className="place-wrapper">
      <h3 className="city">{placeEn}</h3>
      <p className="country">{countryEn}</p>
    </div>
  );
}

export default React.memo(Place);
