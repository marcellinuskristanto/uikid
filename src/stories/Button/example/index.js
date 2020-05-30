import React from 'react';
import {Button} from '../../../components';

const ButtonEx = ({...props}) => {
  const [isLoading, setLoading] = React.useState(false);
  const onClick = (index) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }
  return(
      <Button
        {...props}
        isLoading={isLoading}
        onClick={onClick}
      >
        {props.children}
      </Button>
  )
}

export default ButtonEx;