import React from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';
import themes from '../themes';
import CardHeader from './header';
import CardBody from './body';
import Container from '../Container';
import {cssjoin, cssautosize} from '../../helpers';
// box-shadow: 0 0 4px 0 rgba(0,0,0,.08), 0 2px 4px 0 rgba(0,0,0,.12);
const StyledCard = styled.div`
  box-shadow: 0 0 4px 0 ${props => props.themex.colors.default.main}, 0 2px 2px 0 ${props => props.themex.colors.default.main};
  ${props => props.shortcutStyle};
  ${props => props.styled};
`;

StyledCard.defaultProps = {
  themex: themes.primary,
  shortcutStyle: themes.styled
}

const Card = ({...props}) => {
  return(
    <StyledCard className="card" {...props}>
      {props.children}
    </StyledCard>
  )
}

Card.defaultProps = {
}
Card.propTypes = {
  /**
  * Add custom style inside styled components
  **/
  styled: PropTypes.oneOfType([
    PropTypes.string,PropTypes.func
  ]),
}

Card.Header = CardHeader;
Card.Body = CardBody;
export default Card;