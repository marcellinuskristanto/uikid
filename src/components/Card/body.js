import React from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';
import themes from '../themes';
import {forwardRef} from '../Hoc';

const StyledCardBody = styled.div`
  ${props => props.shortcutStyled};
  ${props => props.styled};
`;

StyledCardBody.defaultProps = {
  theme: themes.primary,
  shortcutStyled: themes.styled
}

const CardBody = ({forwardedRef,...props}) => {
  return(
    <StyledCardBody className="card__body" ref={forwardedRef} {...props} />
  )
}

CardBody.defaultProps = {
}
CardBody.propTypes = {
  /**
  * Add custom style inside styled components
  **/
  styled: PropTypes.oneOfType([
    PropTypes.string,PropTypes.func
  ]),
}

export default forwardRef(CardBody);