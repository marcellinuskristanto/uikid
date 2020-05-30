import React from 'react';
import {InputField} from '../../../components';

const NumberField = (props) => {
  const [value, setValue] = React.useState(0);
  return(
    <InputField
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}

export default NumberField;