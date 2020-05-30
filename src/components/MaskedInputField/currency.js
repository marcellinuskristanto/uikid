import React from 'react';
import PropTypes from 'prop-types';
import MaskedInputField from '.';
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

const defaultMaskOptions = {
  prefix: '$',
  suffix: '',
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: ',',
  allowDecimal: true,
  decimalSymbol: '.',
  decimalLimit: 2, // how many digits allowed after the decimal
  integerLimit: 7, // limit length of integer numbers
  allowNegative: false,
  allowLeadingZeroes: false,
}

const MaskedInputFieldCurrency = ({maskOptions, ...props}) => {
  const currencyMask = createNumberMask({
    ...defaultMaskOptions,
    ...maskOptions,
  })
  return(
    <MaskedInputField
      {...props}
      inputMode='numeric'
      mask={currencyMask}
    />
  )
}

MaskedInputFieldCurrency.defaultProps = {
  maskOptions: defaultMaskOptions,
}

MaskedInputFieldCurrency.propTypes = {
  maskOptions: PropTypes.shape({
    prefix: PropTypes.string,
    suffix: PropTypes.string,
    includeThousandsSeparator: PropTypes.bool,
    thousandsSeparatorSymbol: PropTypes.string,
    allowDecimal: PropTypes.bool,
    decimalSymbol: PropTypes.string,
    decimalLimit: PropTypes.number,
    integerLimit: PropTypes.number,
    requireDecimal: PropTypes.bool,
    allowNegative: PropTypes.bool,
    allowLeadingZeroes: PropTypes.bool,
  }),
}

export default MaskedInputFieldCurrency