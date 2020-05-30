import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import InputField from '../InputField';
import {forwardRef} from '../Hoc';
import MaskedInputFieldCurrency from './currency';
import MaskedInputFieldDate from './date';

const InputFieldForwardRef = forwardRef(InputField);

const MaskedInputField = (props) => {
  return(
    <MaskedInput
      render={(ref, props) => (
        <InputFieldForwardRef {...props} ref={ref} />
      )}
      {...props}
    />
  )
}

MaskedInputField.propTypes = {
  mask: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.func,
    PropTypes.bool,
    PropTypes.shape({
      mask: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
      pipe: PropTypes.func,
    }),
  ]).isRequired,
  guide: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  pipe: PropTypes.func,
  placeholderChar: PropTypes.string,
  keepCharPositions: PropTypes.bool,
  showMask: PropTypes.bool,
}


MaskedInputField.Currency = MaskedInputFieldCurrency;
MaskedInputField.Date = MaskedInputFieldDate;
export default MaskedInputField