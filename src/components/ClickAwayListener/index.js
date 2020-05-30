import React from 'react';
import PropTypes from 'prop-types';

const ClickAwayListener = (props) => {
  const {onClickAway} = props;
  const containerRef = React.useRef(null);

  function onClickOutside(e){
    if(containerRef && containerRef.current && !containerRef.current.contains(e.target)){
      onClickAway(e);
    }
  }

  React.useEffect(() => {
    document.addEventListener("click", onClickOutside);
    return () => {
      document.removeEventListener("click", onClickOutside);
    }
  }, [])

  return(
    <div ref={containerRef}>
      {props.children}
    </div>
  )
}

ClickAwayListener.propTypes = {
  /**
  * fired when click outside this component
  * <br/>
  * onClickAway (event: SyntheticEvent)
  */
  onClickAway: PropTypes.func.isRequired
}

export default ClickAwayListener;