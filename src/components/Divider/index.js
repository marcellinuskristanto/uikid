import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import themes from '../themes';
import {cssautocolor} from '../../helpers';

const StyledDivider = styled.div`
  background-color: ${props => props.color ? cssautocolor(props.color, props.theme) : props.theme.colors.default.main};
  width: 100%;
  height: 1px;
  ${props => props.shortcutStyle };
  ${props => props.styled };
`;

StyledDivider.defaultProps = {theme: themes.primary,shortcutStyle: themes.styled}

const Divider = ({forwardedRef,...props}) => {
  return(
    <StyledDivider
      ref={forwardedRef}
      {...props}
    />
  )
}

Divider.defaultProps = {
}
Divider.propTypes = {
  color: PropTypes.string,
  style: PropTypes.object,
  /**
  * Add custom style inside styled components
  **/
  styled: PropTypes.oneOfType([
    PropTypes.string,PropTypes.func
  ]),
}

export default Divider;