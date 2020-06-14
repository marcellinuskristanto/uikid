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

const StyledCheckbox = styled.input.attrs(props => ({
  type: "checkbox"
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
      borderColorChecked = props.theme.colors.default.main,
      bgColor = props.theme.colors.default.main;
  if(props.error){
    borderColor = props.theme.colors.error.main;
    borderColorChecked = props.theme.colors.error.main;
    bgColor = props.theme.colors.error.main;
  }
  else if (props.color==="primary" || props.color==="secondary"){
    borderColorChecked = props.theme.colors[props.color].main;
    bgColor = props.theme.colors[props.color].main;
  }
  else{
    borderColorChecked = props.color;
    bgColor = props.color;
  }
  return {
    borderColor: borderColor,
    borderColorChecked: borderColorChecked,
    backgroundColor: bgColor
  }
})`
  display: inline-block;
  height: 18px;
  width: 18px;
  background-color: ${props => props.theme.colors.default.main};
  border: 1px solid;
  border-color: ${props => props.borderColor};
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  transition: background .2s ease,border-color .1s linear;
  &:after{
    content: "";
    display: block;
    transform: rotate(45deg) scale(0.5);
    transition: transform .2s ease-out;
  }
  ${StyledCheckbox}:checked ~ &{
    background-color: ${props => props.backgroundColor};
    border-color: ${props => props.borderColorChecked};
  }
  ${StyledCheckbox}:checked ~ &:after{
    margin-bottom: 4px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg) scale(1);
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
StyledCheckbox.defaultProps = {theme: themes.primary,shortcutStyle: themes.styled}
StyledCheckmark.defaultProps = {theme: themes.primary,shortcutStyle: themes.styled}
StyledLabel.defaultProps = {theme: themes.primary,shortcutStyle: themes.styled}

const Checkbox = ({
  styled, checked, color, disabled, error, onChange,
  inputProps, checkboxProps, labelProps,
  ...props
}) => {
  return(
    <StyledContainer styled={styled} disabled={disabled} {...props}>
      <StyledCheckbox checked={checked} onChange={onChange} {...inputProps}/>
      <StyledCheckmark color={color} error={error} {...checkboxProps}/>
      <StyledLabel error={error} {...labelProps}>{props.children}</StyledLabel>
    </StyledContainer>
  )
}

Checkbox.defaultProps = {
  color: "primary",
  disabled: false,
  error: false
}
Checkbox.propTypes = {
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
   * Custom checkbox props
  **/
  checkboxProps: PropTypes.object,
  /**
   * Custom label props
  **/
  labelProps: PropTypes.object
}


export default Checkbox;