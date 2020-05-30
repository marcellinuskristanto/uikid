import React from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';
import themes from '../themes';
import {cssjoin, cssautosize} from '../../helpers';

const StyledTextarea = styled.textarea.attrs(props => ({
  fontSize: cssautosize(props.size, {
    sm: props.themex.fxs,
    md: props.themex.fmd,
    lg: props.themex.flg,
  }),
  paddingSize: cssautosize(props.size, {
    sm: cssjoin("4px", "12px"),
    md: cssjoin("8px", "12px"),
    lg: cssjoin("8px", "16px"),
  }),
  variantStyle: props.variant=="outlined" ? StyledOutlined : StyledDefault,
  textColor: props.themex.colors.default.text,
  borderColor: props.error ? props.themex.colors.error.main : props.themex.colors.default.main,
  borderHoverColor: props.error ? props.themex.colors.error.main : props.themex.colors[props.color].main
}))`
  font-size: ${props => props.fontSize};
  padding: ${props => props.paddingSize};
  background: transparent;
  color: ${props => props.textColor};
  outline: none;
  width: ${props => props.fullWidth && "100%"};
  ${props => props.variantStyle};
  ${props => props.disabled && css`
      opacity: 0.6;
      pointer-events: none;
    `
  };
  ${props => props.styled};
`;
const StyledOutlined = css`
  border-radius: 5px;
  border: 1px solid ${props => props.borderColor};
  transition: border-color 0.3s ease-in;
  &:hover, &:focus {
    border-color: ${props => props.borderHoverColor};
  }
`
const StyledDefault = css`
  padding-left: 0;
  padding-right: 0;
  border-top: 0;
  border-right: 0;
  border-bottom: 1px solid ${props => props.borderColor};
  border-left: 0;
  transition: border-color 0.3s ease-in;
  &:hover, &:focus {
    border-color: ${props => props.borderHoverColor};
  }
`

StyledTextarea.defaultProps = {
  themex: themes.primary
}

const Textarea = ({forwardedRef,...props}) => {
  return(
    <StyledTextarea ref={forwardedRef} {...props} />
  )
}

Textarea.defaultProps = {
  size: "md",
  color: "primary",
  variant: "default",
  type: "text",
  error: false,
  fullWidth: false,
  disabled: false
}
Textarea.propTypes = {
  /**
  Override style
  **/
  className: PropTypes.string,
  disabled: PropTypes.bool,
  color: PropTypes.oneOf(['primary', 'secondary', 'default']),
  error: PropTypes.bool,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', "lg"]),
  /**
  Override style
  **/
  style: PropTypes.object,
  /**
  * Add custom style inside styled components
  **/
  styled: PropTypes.oneOfType([
    PropTypes.string,PropTypes.func
  ]),
  type: PropTypes.oneOf(['text', 'number', 'password']),
  variant: PropTypes.oneOf(['outlined', 'default']),
  fullWidth: PropTypes.bool
}

export default Textarea;