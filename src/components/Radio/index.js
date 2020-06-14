import React from 'react';
import PropTypes from 'prop-types';
import themes from '../themes';
import styled from 'styled-components';

const StyledContainer = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  ${props => {
    if(props.disabled){
      return `
        opacity: 0.6;
        pointer-events: none;
      `
    }
  }}
  ${props => props.shortcutStyle };
  ${props => props.styled};
`
const StyledRadio = styled.input.attrs(props => ({
  type: "radio"
}))`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
  ${props => props.shortcutStyle };
  ${props => props.styled};
`
const StyledCheckmark = styled.span.attrs(props => {
  let borderColor = props.theme.colors.default.main,
      bgColor = props.theme.colors.default.main;
  if(props.error){
    borderColor = props.theme.colors.error.main;
    bgColor = props.theme.colors.error.main;
  }
  else if (props.color==="primary" || props.color==="secondary"){
    bgColor = props.theme.colors[props.color].main;
  }
  else{
    bgColor = props.color;
  }
  return {
    borderColor: borderColor,
    backgroundColor: bgColor
  }
})`
  display: inline-block;
  border-radius: 50%;
  height: 17px;
  width: 17px;
  background-color: ${props => props.theme.colors.default.main};
  box-shadow: 0 0px 1px 1px ${props => props.theme.colors.default.main};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  &:after{
    content: "";
    display: block;
    width: 50%;
    height: 50%;
    position: absolute;
    background-color: ${props => props.backgroundColor};
    border-radius: 50%;
    transform: scale(0);
    transition: transform .1s ease-out;
  }
  ${StyledRadio}:checked ~ &:after {
    transform: scale(1);
  }
  ${props => props.shortcutStyle };
  ${props => props.styled};
`
const StyledLabel = styled.span.attrs(props=>({
  textColor: props.error ? props.theme.colors.error.text : props.theme.colors.default.text
}))`
  padding-left: 10px;
  color: ${props => props.textColor};
  ${props => props.shortcutStyle };
  ${props => props.styled};
`

StyledContainer.defaultProps = {theme: themes.primary,shortcutStyle: themes.styled}
StyledRadio.defaultProps = {theme: themes.primary,shortcutStyle: themes.styled}
StyledCheckmark.defaultProps = {theme: themes.primary,shortcutStyle: themes.styled}
StyledLabel.defaultProps = {theme: themes.primary,shortcutStyle: themes.styled}

const Radio = ({
  styled, checked, name, color, disabled, error, onChange,
  inputProps, radioProps, labelProps,
  ...props
}) => {
  return(
    <StyledContainer styled={styled} disabled={disabled} {...props}>
      <StyledRadio checked={checked} name={name} onChange={onChange} {...inputProps}/>
      <StyledCheckmark color={color} error={error} {...radioProps}/>
      <StyledLabel error={error} {...labelProps}>{props.children}</StyledLabel>
    </StyledContainer>
  )
}

Radio.defaultProps = {
  color: "primary",
  disabled: false,
  error: false
}
Radio.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  /**
  * Add custom style inside styled components
  **/
  styled: PropTypes.oneOfType([
    PropTypes.string,PropTypes.func
  ]),
  /**
   * Custom input props
  **/
  inputProps: PropTypes.object,
  /**
   * Custom radio props
  **/
  radioProps: PropTypes.object,
  /**
   * Custom label props
  **/
  labelProps: PropTypes.object
}


export default Radio;