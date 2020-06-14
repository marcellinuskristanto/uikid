import React from 'react';
import styled, { css, withTheme } from 'styled-components';
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
  ${props => props.shortcutStyle };
  ${props => props.styled};
`
const StyledValueContainer = styled(components.ValueContainer).attrs((props) => {
  return{
    variantStyle: props.variant!=="outlined" && "padding-left: 0",
    fontSize: cssautosize(props.size, {
      sm: props.theme.fxs,
      md: props.theme.fmd,
      lg: props.theme.flg,
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
  ${props => props.shortcutStyle };
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
    textColor: props.theme.colors.default.text,
    borderColor: props.error ? props.theme.colors.error.main : (props.isFocused ? cssautocolor(props.color, props.theme) : props.theme.colors.default.main),
    borderHoverColor: props.error ? props.theme.colors.error.main : cssautocolor(props.color, props.theme)
  }
})`
  background: ${props => props.theme.colors.background};
  min-height: ${props=>props.minHeight};
  outline: none;
  box-shadow: none;
  transition: border-color 0.3s ease-in;
  ${props => props.variantStyle};
  &:hover, &:focus {
    border-color: ${props => props.borderHoverColor};
  }
  ${props => props.shortcutStyle };
  ${props => props.styled};
`
const StyledIndicatorsContainer = styled(components.IndicatorsContainer).attrs(props => {
  return {
    color: props.theme.colors.default.main,
    hoverColor: props.theme.colors.default.dark
  }
})`
  color: ${props => props.color};
  transition: color 0.3s ease-in;
  &:hover {
    color: ${props => props.hoverColor};
  }
  ${props => props.shortcutStyle };
  ${props => props.styled};
`
const StyledClearIndicator = styled(components.ClearIndicator).attrs(props => {
  return {
    padding: cssautosize(props.size, {
      sm: "4px",
      md: "8px",
      lg: "8px",
    }),
    color: props.theme.colors.default.main,
    hoverColor: props.theme.colors.default.dark
  }
})`
  padding: ${props=> props.padding};
  color: ${props => props.color};
  transition: color 0.3s ease-in;
  &:hover {
    color: ${props => props.hoverColor};
  }
  ${props => props.shortcutStyle };
  ${props => props.styled};
`
const StyledDropdownIndicator = styled(components.DropdownIndicator).attrs(props => {
  return {
    padding: cssautosize(props.size, {
      sm: "4px",
      md: "8px",
      lg: "8px",
    }),
    color: props.theme.colors.default.main,
    hoverColor: props.theme.colors.default.dark
  }
})`
  padding: ${props=> props.padding};
  color: ${props => props.color};
  transition: color 0.3s ease-in;
  &:hover {
    color: ${props => props.hoverColor};
  }
  ${props => props.shortcutStyle };
  ${props => props.styled};
`
const StyledOption = styled(components.Option).attrs(props => {
  return {
    fontSize: cssautosize(props.size, {
      sm: props.theme.fxs,
      md: props.theme.fmd,
      lg: props.theme.flg,
    }),
    bgColor: props.isSelected || props.isFocused ? cssautocolor(props.color, props.theme) : props.theme.colors.background,
    textColor: props.isSelected || props.isFocused ? cssautocolor(props.textColor, props.theme, "text") : props.theme.colors.default.text,
  }
})`
  font-size: ${props=>props.fontSize};
  background-color: ${props => props.bgColor};
  color: ${props => props.textColor};
  outline: none;
  &:active{
    background-color: ${props => props.bgColor};
  }
  ${props => props.shortcutStyle };
  ${props => props.styled};
`
const StyledMultiValueContainer = styled(components.MultiValueContainer).attrs(props => {
  return {
    bgColor: props.theme.colors.background,
    textColor: props.theme.colors.default.text,
    borderColor: props.theme.colors.default.main
  }
})`
  border: 1px solid ${props=>props.borderColor};
  background-color: ${props => props.bgColor};
  color: ${props => props.textColor};
  ${props => props.shortcutStyle };
  ${props => props.styled};
`
// multi value square
const StyledMultiValue = styled(components.MultiValue).attrs(props => {
  return {
    bgColor: props.theme.colors.background,
    textColor: props.theme.colors.default.text,
    borderColor: props.theme.colors.default.main
  }
})`
  &.css-1rhbuit-multiValue{
    border: 1px solid ${props=>props.borderColor};
    background-color: ${props => props.bgColor};
    color: ${props => props.textColor};
    ${props => props.shortcutStyle };
    ${props => props.styled};
  }
`
const StyledMultiValueLabel = styled(components.MultiValueLabel)`
  border: none;
  ${props => props.shortcutStyle };
  ${props => props.styled};
`
const StyledMultiValueRemove = styled(components.MultiValueRemove)`
  border: none;
  ${props => props.shortcutStyle };
  ${props => props.styled};
`

StyledSelectContainer.defaultProps = {theme: themes.primary,shortcutStyle: themes.styled}
StyledValueContainer.defaultProps = {theme: themes.primary,shortcutStyle: themes.styled}
StyledControl.defaultProps = {theme: themes.primary,shortcutStyle: themes.styled}
StyledClearIndicator.defaultProps = {theme: themes.primary,shortcutStyle: themes.styled}
StyledDropdownIndicator.defaultProps = {theme: themes.primary,shortcutStyle: themes.styled}
StyledIndicatorsContainer.defaultProps = {theme: themes.primary,shortcutStyle: themes.styled}
StyledOption.defaultProps = {theme: themes.primary,shortcutStyle: themes.styled}
StyledMultiValueContainer.defaultProps = {theme: themes.primary,shortcutStyle: themes.styled}
StyledMultiValue.defaultProps = {theme: themes.primary,shortcutStyle: themes.styled}
StyledMultiValueLabel.defaultProps = {theme: themes.primary,shortcutStyle: themes.styled}
StyledMultiValueRemove.defaultProps = {theme: themes.primary,shortcutStyle: themes.styled}

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

const withMergeTheme = (Component) => {
  const ComponentWithMergedTheme = ({reactSelectTheme, uikidTheme, ...props}) => {
    // reactSelectTheme bisa null
    const reactSelectColors = reactSelectTheme && reactSelectTheme.colors
    const mergedTheme = {
      ...reactSelectTheme,
      ...uikidTheme,
      colors: {
        ...reactSelectColors,
        ...uikidTheme.colors
      }
    }
    return <Component theme={mergedTheme} {...props} />
  }
  return ({...props}) => {
    return <ComponentWithMergedTheme {...props}/>
  }
}

const SelectContainerMergedTheme = withMergeTheme(SelectContainer)
const ValueContainerMergedTheme = withMergeTheme(ValueContainer)
const ControlMergedTheme = withMergeTheme(Control)
const DropdownIndicatorMergedTheme = withMergeTheme(DropdownIndicator)
const ClearIndicatorMergedTheme = withMergeTheme(ClearIndicator)
const IndicatorsContainerMergedTheme = withMergeTheme(IndicatorsContainer)
const OptionMergedTheme = withMergeTheme(Option)
const MultiValueContainerMergedTheme = withMergeTheme(MultiValueContainer)
const MultiValueMergedTheme = withMergeTheme(MultiValue)
const MultiValueLabelMergedTheme = withMergeTheme(MultiValueLabel)
const MultiValueRemoveMergedTheme = withMergeTheme(MultiValueRemove)

const Select = ({
  styled, valueContainerProps, controlProps, dropdownIndicatorProps, clearIndicatorProps,
  indicatorsContainerProps, optionProps, multiValueContainerProps, multiValueProps, multiValueLabelProps,
  multiValueRemoveProps, closeMenuOnSelect, textColor, theme, ...props
}) => {
  const colorText = textColor || props.color;
  const uikidTheme = theme;
  props.closeMenuOnSelect = closeMenuOnSelect===undefined ? (props.isMulti ? false : true) : closeMenuOnSelect
  return(
    <ReactSelect
      styles={{
        menuList: () => ({
          padding: 0
        }),
        multiValueLabel: (base) => ({
          ...base,
          color: uikidTheme.colors.default.text
        })
      }}
      components={{
        SelectContainer: ({theme, ...innerProps}) => <SelectContainerMergedTheme {...innerProps} styled={styled} {...props} uikidTheme={uikidTheme} reactSelectTheme={theme} />,
        ValueContainer: ({theme, ...innerProps}) => <ValueContainerMergedTheme {...innerProps} {...valueContainerProps} {...props} uikidTheme={uikidTheme} reactSelectTheme={theme} />,
        Control: ({theme, ...innerProps}) => <ControlMergedTheme {...innerProps} {...controlProps} {...props} uikidTheme={uikidTheme} reactSelectTheme={theme} />,
        DropdownIndicator: ({theme, ...innerProps}) => <DropdownIndicatorMergedTheme {...innerProps} {...dropdownIndicatorProps} {...props} uikidTheme={uikidTheme} reactSelectTheme={theme} />,
        ClearIndicator: ({theme, ...innerProps}) => <ClearIndicatorMergedTheme {...innerProps} {...clearIndicatorProps} {...props} uikidTheme={uikidTheme} reactSelectTheme={theme} />,
        IndicatorsContainer: ({theme, ...innerProps}) => <IndicatorsContainerMergedTheme {...innerProps} {...indicatorsContainerProps} {...props} uikidTheme={uikidTheme} reactSelectTheme={theme} />,
        Option: ({theme, ...innerProps}) => <OptionMergedTheme {...innerProps} textColor={colorText} {...optionProps} {...props} uikidTheme={uikidTheme} reactSelectTheme={theme} />,
        MultiValueContainer: ({theme, ...innerProps}) => <MultiValueContainerMergedTheme {...innerProps} {...multiValueContainerProps} {...props} uikidTheme={uikidTheme} reactSelectTheme={theme} />,
        MultiValue: ({theme, ...innerProps}) => <MultiValueMergedTheme {...innerProps} {...multiValueProps} {...props} uikidTheme={uikidTheme} reactSelectTheme={theme} />,
        MultiValueLabel: ({theme, ...innerProps}) => <MultiValueLabelMergedTheme {...innerProps} {...multiValueLabelProps} {...props} uikidTheme={uikidTheme} reactSelectTheme={theme} />,
        MultiValueRemove: ({theme, ...innerProps}) => <MultiValueRemoveMergedTheme {...innerProps} {...multiValueRemoveProps} {...props} uikidTheme={uikidTheme} reactSelectTheme={theme} />,
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
  isMulti: false,
  theme: themes.primary
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
  selectContainerProps: PropTypes.shape({
    styled: PropTypes.oneOfType([
      PropTypes.string,PropTypes.func
    ])
  }),
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

export default withTheme(Select);