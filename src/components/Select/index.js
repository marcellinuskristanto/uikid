import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import ReactSelect, {components} from 'react-select';
import themes from '../themes';
import {cssautosize, cssjoin, cssautocolor} from '../../helpers';

const StyledControlOutlined = css`
  border-radius: 5px;
  border: 1px solid ${props => props.borderColor};
`
const StyledControlDefault = css`
  border-radius: 0;
  border-top: 0;
  border-right: 0;
  border-bottom: 1px solid ${props => props.borderColor};
  border-left: 0;
`

const StyledSelectContainer = styled(components.SelectContainer)`
  ${props => props.styled};
`
const StyledValueContainer = styled(components.ValueContainer).attrs((props) => {
  return{
    variantStyle: props.variant!=="outlined" && "padding-left: 0",
    fontSize: cssautosize(props.size, {
      sm: props.themex.fxs,
      md: props.themex.fmd,
      lg: props.themex.flg,
    }),
    paddingSize: cssautosize(props.size, {
      sm: cssjoin("2px", "6px"),
      md: cssjoin("2px", "8px"),
      lg: cssjoin("4px", "12px"),
    }),
  }
})`
  font-size: ${props => props.fontSize};
  align-self: stretch;
  padding: ${props => props.paddingSize};
  & > .css-b8ldur-Input{
    margin: 0;
    padding: 0;
  }
  ${props => props.variantStyle};
  ${props => props.styled};
`
const StyledControl = styled(components.Control).attrs(props => {
  return {
    minHeight: cssautosize(props.size, {
      sm: "30px",
      md: "38px",
      lg: "38px"
    }),
    variantStyle: props.variant=="outlined" ? StyledControlOutlined : StyledControlDefault,
    textColor: props.themex.colors.default.text,
    borderColor: props.error ? props.themex.colors.error.main : (props.isFocused ? cssautocolor(props.color, props.themex) : props.themex.colors.default.main),
    borderHoverColor: props.error ? props.themex.colors.error.main : cssautocolor(props.color, props.themex)
  }
})`
  min-height: ${props=>props.minHeight};
  outline: none;
  box-shadow: none;
  transition: border-color 0.3s ease-in;
  ${props => props.variantStyle};
  &:hover, &:focus {
    border-color: ${props => props.borderHoverColor};
  }
  ${props => props.styled};
`
const StyledIndicatorsContainer = styled(components.IndicatorsContainer).attrs(props => {
  return {
    color: props.themex.colors.default.main,
    hoverColor: props.themex.colors.default.dark
  }
})`
  color: ${props => props.color};
  transition: color 0.3s ease-in;
  &:hover {
    color: ${props => props.hoverColor};
  }
  ${props => props.styled};
`
const StyledClearIndicator = styled(components.ClearIndicator).attrs(props => {
  return {
    padding: cssautosize(props.size, {
      sm: "4px",
      md: "8px",
      lg: "8px",
    }),
    color: props.themex.colors.default.main,
    hoverColor: props.themex.colors.default.dark
  }
})`
  padding: ${props=> props.padding};
  color: ${props => props.color};
  transition: color 0.3s ease-in;
  &:hover {
    color: ${props => props.hoverColor};
  }
  ${props => props.styled};
`
const StyledDropdownIndicator = styled(components.DropdownIndicator).attrs(props => {
  return {
    padding: cssautosize(props.size, {
      sm: "4px",
      md: "8px",
      lg: "8px",
    }),
    color: props.themex.colors.default.main,
    hoverColor: props.themex.colors.default.dark
  }
})`
  padding: ${props=> props.padding};
  color: ${props => props.color};
  transition: color 0.3s ease-in;
  &:hover {
    color: ${props => props.hoverColor};
  }
  ${props => props.styled};
`
const StyledOption = styled(components.Option).attrs(props => {
  return {
    fontSize: cssautosize(props.size, {
      sm: props.themex.fxs,
      md: props.themex.fmd,
      lg: props.themex.flg,
    }),
    bgColor: props.isSelected || props.isFocused ? cssautocolor(props.color, props.themex) : props.themex.colors.background,
    // bgHoverColor: cssautocolor(props.color, props.themex),
    textColor: props.isSelected || props.isFocused ? cssautocolor(props.textColor, props.themex, "text") : props.themex.colors.default.text,
    // textHoverColor: cssautocolor(props.textColor, props.themex, "text")
  }
})`
  font-size: ${props=>props.fontSize};
  background-color: ${props => props.bgColor};
  color: ${props => props.textColor};
  outline: none;
  &:active{
    background-color: ${props => props.bgColor};
  }
  ${props => props.styled};
`
const StyledMultiValueContainer = styled(components.MultiValueContainer).attrs(props => {
  return {
    bgColor: props.themex.colors.background,
    textColor: props.themex.colors.default.text,
    borderColor: props.themex.colors.default.main
  }
})`
  border: 1px solid ${props=>props.borderColor};
  background-color: ${props => props.bgColor};
  color: ${props => props.textColor};
  ${props => props.styled};
`
const StyledMultiValue = styled(components.MultiValue).attrs(props => {
  return {
    bgColor: props.themex.colors.background,
    textColor: props.themex.colors.default.text,
    borderColor: props.themex.colors.default.main
  }
})`
  &.css-1rhbuit-multiValue{
    border: 1px solid ${props=>props.borderColor};
    background-color: ${props => props.bgColor};
    color: ${props => props.textColor};
    ${props => props.styled};
  }
`
const StyledMultiValueLabel = styled(components.MultiValueLabel)`
  border: none;
  ${props => props.styled};
`
const StyledMultiValueRemove = styled(components.MultiValueRemove)`
  border: none;
  ${props => props.styled};
`

StyledSelectContainer.defaultProps = {themex: themes.primary}
StyledValueContainer.defaultProps = {themex: themes.primary}
StyledControl.defaultProps = {themex: themes.primary}
StyledClearIndicator.defaultProps = {themex: themes.primary}
StyledDropdownIndicator.defaultProps = {themex: themes.primary}
StyledIndicatorsContainer.defaultProps = {themex: themes.primary}
StyledOption.defaultProps = {themex: themes.primary}
StyledMultiValueContainer.defaultProps = {themex: themes.primary}
StyledMultiValue.defaultProps = {themex: themes.primary}
StyledMultiValueLabel.defaultProps = {themex: themes.primary}
StyledMultiValueRemove.defaultProps = {themex: themes.primary}

const SelectContainer = ({children, ...props}) => {
  return(
    <StyledSelectContainer {...props}>
      {children}
    </StyledSelectContainer>
  )
}
const ValueContainer = ({children, ...props}) => {
  return(
    <StyledValueContainer {...props}>
      {children}
    </StyledValueContainer>
  )
}
const Control = ({children, ...props}) => {
  return(
    <StyledControl {...props}>
      {children}
    </StyledControl>
  )
}
const IndicatorsContainer = ({children, ...props}) => {
  return(
    <StyledIndicatorsContainer {...props}>
      {children}
    </StyledIndicatorsContainer>
  )
}
const ClearIndicator = ({children, ...props}) => {
  return(
    <StyledClearIndicator {...props}>
      {children}
    </StyledClearIndicator>
  )
}
const DropdownIndicator = ({children, ...props}) => {
  return(
    <StyledDropdownIndicator {...props}>
      {children}
    </StyledDropdownIndicator>
  )
}
const Option = ({children, ...props}) => {
  return(
    <StyledOption {...props}>
      {children}
    </StyledOption>
  )
}
const MultiValueContainer = ({children, ...props}) => {
  return(
    <StyledMultiValueContainer {...props}>
      {children}
    </StyledMultiValueContainer>
  )
}
const MultiValue = ({children, ...props}) => {
  return(
    <StyledMultiValue {...props}>
      {children}
    </StyledMultiValue>
  )
}
const MultiValueLabel = ({children, ...props}) => {
  return(
    <StyledMultiValueLabel {...props}>
      {children}
    </StyledMultiValueLabel>
  )
}
const MultiValueRemove = ({children, ...props}) => {
  return(
    <StyledMultiValueRemove {...props}>
      {children}
    </StyledMultiValueRemove>
  )
}

const Select = ({
  styled, valueContainerProps, controlProps, dropdownIndicatorProps, clearIndicatorProps,
  indicatorsContainerProps, optionProps, multiValueContainerProps, multiValueProps, multiValueLabelProps,
  multiValueRemoveProps, closeMenuOnSelect, textColor, ...props
}) => {
  const colorText = textColor || props.color;
  props.closeMenuOnSelect = closeMenuOnSelect===undefined ? (props.isMulti ? false : true) : closeMenuOnSelect
  return(
    <ReactSelect
      components={{
        SelectContainer: (innerProps) => <SelectContainer {...innerProps} styled={styled} {...props}/>,
        ValueContainer: (innerProps) => <ValueContainer {...innerProps} {...valueContainerProps} {...props}/>,
        Control: ({...innerProps}) => <Control {...innerProps} {...controlProps} {...props}/>,
        DropdownIndicator: (innerProps) => <DropdownIndicator {...innerProps} {...dropdownIndicatorProps} {...props}/>,
        ClearIndicator: (innerProps) => <ClearIndicator {...innerProps} {...clearIndicatorProps} {...props}/>,
        IndicatorsContainer: (innerProps) => <IndicatorsContainer {...innerProps} {...indicatorsContainerProps} {...props}/>,
        Option: (innerProps) => <Option {...innerProps} textColor={colorText} {...optionProps} {...props}/>,
        MultiValueContainer: (innerProps) => <MultiValueContainer {...innerProps} {...multiValueContainerProps} {...props}/>,
        MultiValue: (innerProps) => <MultiValue {...innerProps} {...multiValueProps} {...props}/>,
        MultiValueLabel: (innerProps) => <MultiValueLabel {...innerProps} {...multiValueLabelProps} {...props}/>,
        MultiValueRemove: (innerProps) => <MultiValueRemove {...innerProps} {...multiValueRemoveProps} {...props}/>,
      }}
      {...props}
    />
  )
}

Select.defaultProps = {
  isClearable: true,
  isDisabled: false,
  isLoading: false,
  isRtl: false,
  isSearchable: true,
  color: "primary",
  error: false,
  size: "md",
  variant: "default",
  isMulti: false
}
Select.propTypes = {
  isClearable: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  isRtl: PropTypes.bool,
  isSearchable: PropTypes.bool,
  closeMenuOnSelect: PropTypes.bool,
  isMulti: PropTypes.bool,
  color: PropTypes.string,
  textColor: PropTypes.string,
  error: PropTypes.bool,
  size: PropTypes.string,
  variant: PropTypes.oneOf(["outlined", "default"]),
  valueContainerProps: PropTypes.shape({
    styled: PropTypes.oneOfType([
      PropTypes.string,PropTypes.func
    ])
  }),
  controlProps: PropTypes.shape({
    styled: PropTypes.oneOfType([
      PropTypes.string,PropTypes.func
    ])
  }),
  dropdownIndicatorProps: PropTypes.shape({
    styled: PropTypes.oneOfType([
      PropTypes.string,PropTypes.func
    ])
  }),
  clearIndicatorProps: PropTypes.shape({
    styled: PropTypes.oneOfType([
      PropTypes.string,PropTypes.func
    ])
  }),
  indicatorsContainerProps: PropTypes.shape({
    styled: PropTypes.oneOfType([
      PropTypes.string,PropTypes.func
    ])
  }),
  optionProps: PropTypes.shape({
    styled: PropTypes.oneOfType([
      PropTypes.string,PropTypes.func
    ])
  }),
  multiValueContainerProps: PropTypes.shape({
    styled: PropTypes.oneOfType([
      PropTypes.string,PropTypes.func
    ])
  }),
  multiValueProps: PropTypes.shape({
    styled: PropTypes.oneOfType([
      PropTypes.string,PropTypes.func
    ])
  }),
  multiValueLabelProps: PropTypes.shape({
    styled: PropTypes.oneOfType([
      PropTypes.string,PropTypes.func
    ])
  }),
  multiValueRemoveProps: PropTypes.shape({
    styled: PropTypes.oneOfType([
      PropTypes.string,PropTypes.func
    ])
  }),
  /**
  * Add custom style inside styled components
  **/
  styled: PropTypes.oneOfType([
    PropTypes.string,PropTypes.func
  ]),
}

export default Select;