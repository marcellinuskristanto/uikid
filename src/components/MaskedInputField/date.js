import React from 'react';
import PropTypes from 'prop-types';
import MaskedInputField from '.';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';

const defaultOptions = {
  format: 'mm/dd/yyyy',
  mask: [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/],
  keepCharPositions: true
}

const MaskedInputFieldDate = ({format, minYear, maxYear, ...props}) => {
  const autoCorrectedDatePipe = createAutoCorrectedDatePipe(format, {minYear,maxYear})
  return(
    <MaskedInputField
      pipe={autoCorrectedDatePipe}
      {...props}
    />
  )
}

MaskedInputFieldDate.defaultProps = defaultOptions;

MaskedInputFieldDate.propTypes = {
  mask: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.func,
    PropTypes.bool,
    PropTypes.shape({
      mask: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
      pipe: PropTypes.func,
    }),
  ]).isRequired,
  format: PropTypes.string,
  keepCharPositions: PropTypes.bool,
  minYear: PropTypes.number,
  maxYear: PropTypes.number
}

export default MaskedInputFieldDate