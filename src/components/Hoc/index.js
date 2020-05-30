import React from 'react';
import styled from 'styled-components';

const forwardRef = (Component) => {
  return(
    React.forwardRef((props, ref) => {
      return(
        <Component {...props} forwardedRef={ref} />
      )
    })
  )
}
const withDynamicStyledComponent = (Component) => {
  const DynamicTag = ({...props}) => {
    const tag = styled[tag]``;
    return (
      <Component {...props} />
    )
  }
}

export {
  forwardRef
}