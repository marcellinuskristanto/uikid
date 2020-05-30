import React from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';
import themes from '../themes';
import {cssjoin, cssautosize} from '../../helpers';

const StyledCardHeader = styled.div`
  border-bottom: 1px solid ${props=>props.themex.colors.default.main};
  ${props => props.shortcutStyled};
  ${props => props.styled};
`;

StyledCardHeader.defaultProps = {
  themex: themes.primary,
  shortcutStyled: themes.styled
}

const CardHeader = ({...props}) => {
  return(
    <StyledCardHeader className="card__header" {...props} />
  )
}

CardHeader.defaultProps = {
}
CardHeader.propTypes = {
  /**
  * Add custom style inside styled components
  **/
  styled: PropTypes.oneOfType([
    PropTypes.string,PropTypes.func
  ]),
}

export default CardHeader;