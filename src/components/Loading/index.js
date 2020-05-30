import React from 'react';
import PropTypes from 'prop-types';
import LoadingSpinner from './spinner';
import LoadingDots from './dots';

const Loading = ({...props}) => {
  return(
    <LoadingSpinner {...props} />
  )
}

Loading.defaultProps = {
}
Loading.propTypes = {
}

Loading.Spinner = LoadingSpinner;
Loading.Dots = LoadingDots;

export default Loading;
export {
  LoadingSpinner,
  LoadingDots
}