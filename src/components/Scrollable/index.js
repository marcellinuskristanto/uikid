import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import themes from '../themes';

const StyledScrollable = styled.div`
  ${props => props.direction==="column" ? StyledScrollableVertical : StyledScrollableHorizontal};
  ${props => props.shortcutStyle};
  ${props => props.styled};
`
const StyledScrollableHorizontal = css`
  display: inline-flex;
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
`
const StyledScrollableVertical = css`
  display: flex;
  max-height: ${props => props.maxHeight};
  overflow-y: auto;
  overflow-x: hidden;
`

StyledScrollable.defaultProps = {
  theme: themes.primary,
  shortcutStyle: themes.styled
}

const Scrollable = ({...props}) => {
  return(
    <StyledScrollable {...props}>
      {props.children}
    </StyledScrollable>
  )
}

Scrollable.defaultProps = {
  direction: "row"
}
Scrollable.propTypes = {
  direction: PropTypes.oneOf(["column", "row"]),
  maxHeight: PropTypes.string,
  /**
  * Add custom style inside styled components
  **/
  styled: PropTypes.oneOfType([
    PropTypes.string,PropTypes.func
  ]),
}

export default Scrollable;