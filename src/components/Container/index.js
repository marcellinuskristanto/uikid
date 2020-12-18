import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import themes from '../themes';
import {forwardRef} from '../Hoc';

const StyledContainer = styled.div`
  ${props => props.shortcutStyle};
  ${props => props.styled};
`
StyledContainer.defaultProps = {
  theme: themes.primary,
  shortcutStyle: themes.styled
};

const Container = ({forwardedRef,...props}) => {
  return(
    <StyledContainer ref={forwardedRef} {...props}>
      {props.children}
    </StyledContainer>
  )
}

Container.defaultProps = {
  marginAuto: false
}

Container.propTypes = {
  /**
   * margin shortcut
  **/
  m: PropTypes.string,
  /**
   * margin top shortcut
  **/
  mt: PropTypes.string,
  /**
   * margin right shortcut
  **/
  mr: PropTypes.string,
  /**
   * margin bottom shortcut
  **/
  mb: PropTypes.string,
  /**
   * margin left shortcut
  **/
  ml: PropTypes.string,
  display: PropTypes.string,
  maxWidth: PropTypes.string,
  minWidth: PropTypes.string,
  marginAuto: PropTypes.bool,
  /**
   * padding shortcut
  **/
  p: PropTypes.string,
  /**
   * padding top shortcut
  **/
  pt: PropTypes.string,
  /**
   * padding right shortcut
  **/
  pr: PropTypes.string,
  /**
   * padding bottom shortcut
  **/
  pb: PropTypes.string,
  /**
   * padding left shortcut
  **/
  pl: PropTypes.string,
  /**
  Add custom style inside styled components
  **/
  styled: PropTypes.string,
}

export default forwardRef(Container);