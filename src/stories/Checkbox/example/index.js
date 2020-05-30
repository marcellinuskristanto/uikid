import React from 'react';
import {Checkbox} from '../../../components';

const CheckboxEx = (props) => {
  const [checked, setChecked] = React.useState(true);
  return(
    <Checkbox
      {...props}
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  )
}

export {
  CheckboxEx
};