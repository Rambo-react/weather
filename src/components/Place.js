import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Place.scss';

function Place({ placeEn, countryEn }) {
  console.log('locality in Place:', placeEn, countryEn);
  return (
    <div>
      <div style={{ border: '1px solid blue' }}>
        <h3 className="city">{placeEn}</h3>
        <p className="country">{countryEn}</p>
      </div>
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
