import React from 'react';
import {Radio} from '../../../components';

const RadioEx = (props) => {
  const [checked, setChecked] = React.useState(true);
  return(
    <Radio
      {...props}
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  )
}

export {
  RadioEx
};