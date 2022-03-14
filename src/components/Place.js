import React from 'react';
import PropTypes from 'prop-types';
import '../styles/place.scss';

function Place({ placeEn, countryEn }) {
  return (
    <div className="place-wrapper">
      <h3 className="city">{placeEn}</h3>
      <p className="country">{countryEn}</p>
    </div>
  );
}

Place.defaultProps = {
  placeEn: 'Нет города',
  countryEn: 'нет страны',
};

Place.propTypes = {
  placeEn: PropTypes.string,
  countryEn: PropTypes.string,
};

export default React.memo(Place);
