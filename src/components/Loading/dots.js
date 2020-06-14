import React from 'react';
import styled, {css,keyframes} from 'styled-components';
import PropTypes from 'prop-types';
import themes from '../themes';
import {cssautocolor} from '../../helpers';

const blink = keyframes`
  0% {
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

const StyledContainer = styled.div`
  display: flex;
  width: ${props=>props.size*3+props.size}px;
  justify-content: space-between;
  margin: auto;
  ${props => props.shortcutStyle};
  ${props => props.styled};
`
const StyledDot = styled.span`
  border-radius: 50%;
  height: ${props=>props.size}px;
  min-width: ${props=>props.size}px;
  background-color: ${props=>cssautocolor(props.color, props.theme)};
  display: inline-block;
  ${props => props.shortcutStyle};
  ${props => props.styled};
`
const ThirdDot = styled(StyledDot)`
  animation: ${blink} 1s ease-in-out 320ms infinite normal none running;
`
const SecondDot = styled(StyledDot)`
  animation: ${blink} 1s ease-in-out 160ms infinite normal none running;
`
const FirstDot = styled(StyledDot)`
  animation: ${blink} 1s ease-in-out 0ms infinite normal none running;
`

StyledContainer.defaultProps = {theme: themes.primary,shortcutStyle: themes.styled}
FirstDot.defaultProps = {theme: themes.primary,shortcutStyle: themes.styled}
SecondDot.defaultProps = {theme: themes.primary,shortcutStyle: themes.styled}
ThirdDot.defaultProps = {theme: themes.primary,shortcutStyle: themes.styled}

const LoadingDots = ({
  firstDotProps, secondDotProps, thirdDotProps, size, color, ...props
}) => {
  return(
    <StyledContainer size={size} {...props}>
      <FirstDot size={size} color={color} {...firstDotProps}/>
      <SecondDot size={size} color={color} {...secondDotProps}/>
      <ThirdDot size={size} color={color} {...thirdDotProps}/>
    </StyledContainer>
  )
}

LoadingDots.defaultProps = {
  size: 8,
  color: "black"
}
LoadingDots.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  /**
  * Add custom style inside styled components
  **/
  styled: PropTypes.oneOfType([
    PropTypes.string,PropTypes.func
  ]),
  firstDotProps: PropTypes.shape({
    styled: PropTypes.oneOfType([
      PropTypes.string,PropTypes.func
    ])
  }),
  secondDotProps: PropTypes.shape({
    styled: PropTypes.oneOfType([
      PropTypes.string,PropTypes.func
    ])
  }),
  thirdDotProps: PropTypes.shape({
    styled: PropTypes.oneOfType([
      PropTypes.string,PropTypes.func
    ])
  })
}

export default LoadingDots;