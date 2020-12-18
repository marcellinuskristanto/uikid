import React from 'react';
import PropTypes from 'prop-types';
import styled, {keyframes} from 'styled-components';
import themes from '../themes';
import {cssautocolor, cssautosize} from '../../helpers';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`
const StyledLoadingSpinner = styled.div.attrs(props=> {
  const heightAndWidth = cssautosize(props.size, {
    sm: "15px",
    md: "25px",
    lg: "35px",
  });
  return{
    height: heightAndWidth,
    width: heightAndWidth
  }
})`
  height: ${props => props.height};
  width: ${props => props.width};
  ${props => props.shortcutStyle};
  ${props => props.styled};
`;
const StyledSpinner = styled.svg`
  animation: ${spin} 0.5s linear infinite;
  & > circle {
    stroke: ${props=> cssautocolor(props.color, props.theme)};
    stroke-width: 5;
    fill: none;
    stroke-dasharray: ${props=>props.fullCircle};
    stroke-dashoffset: 40;
  }
  ${props => props.shortcutStyle};
  ${props => props.styled};
`

StyledLoadingSpinner.defaultProps = {theme: themes.primary,shortcutStyle: themes.styled}
StyledSpinner.defaultProps = {theme: themes.primary,shortcutStyle: themes.styled}

const LoadingSpinner = ({color, svgProps, forwardedRef, ...props}) => {
  const r = 20,
        fullCircle = 2 * 3.14 * r;
  return(
    <StyledLoadingSpinner ref={forwardedRef} {...props}>
      <StyledSpinner viewBox="22 22 44 44" fullCircle={fullCircle} color={color} {...svgProps}>
        <circle cx="44" cy="44" r={r}/>
      </StyledSpinner>
    </StyledLoadingSpinner>
  )
}

LoadingSpinner.defaultProps = {
  size: "md",
  color: "primary"
}
LoadingSpinner.propTypes = {
  /**
   * 'primary' | 'secondary' | 'default' | '\<custom color\>'
  **/
  color: PropTypes.string,
  /**
   * 'sm' | 'md' | 'lg' | '\<num\>px'
  **/
  size: PropTypes.string,
  /**
   * Override style
  **/
  style: PropTypes.object,
  /**
  * Add custom style inside styled components
  **/
  styled: PropTypes.oneOfType([
    PropTypes.string,PropTypes.func
  ]),
  svgProps: PropTypes.shape({
    styled: PropTypes.oneOfType([
      PropTypes.string,PropTypes.func
    ])
  })
}

export default LoadingSpinner;