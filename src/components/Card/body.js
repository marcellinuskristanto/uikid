import React from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';
import themes from '../themes';
import {cssjoin, cssautosize} from '../../helpers';

const StyledCardBody = styled.div`
  ${props => props.shortcutStyled};
  ${props => props.styled};
`;

StyledCardBody.defaultProps = {
  themex: themes.primary,
  shortcutStyled: themes.styled
}

const CardBody = ({...props}) => {
  return(
    <StyledCardBody className="card__body" {...props} />
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

export default CardBody;