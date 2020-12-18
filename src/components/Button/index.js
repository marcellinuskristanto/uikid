import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import themes from '../themes';
import {cssjoin, cssautosize, cssautocolor} from '../../helpers';
import Loading from '../Loading';
import {forwardRef} from '../Hoc';

const StyledButton = styled.button`
  font-size: ${props =>
    cssautosize(props.size, {
      sm: props.theme.fxs,
      md: props.theme.fmd,
      lg: props.theme.flg,
    })
  };
  padding: ${props =>
    cssautosize(props.size, {
      sm: cssjoin(props.theme.pxxs, props.theme.psm),
      md: cssjoin(props.theme.pxs, props.theme.psm),
      lg: cssjoin(props.theme.pxs, props.theme.pmd),
    })
  };
  border-radius: 3px;
  color: ${props => cssautocolor(props.color, props.theme, "text")};
  background-color: ${props => cssautocolor(props.color, props.theme)};
  border: none;
  outline: none;
  cursor: pointer;
  transition: background-color 0.3s ease-in;
  pointer-events: ${props => props.isLoading && "none"};
  &:hover {
    background-color: ${props => cssautocolor(props.color, props.theme, "dark")};
  }
  ${props => {
    if(props.disabled){
      return `
        opacity: 0.6;
        pointer-events: none;
      `
    }
  }}
  ${props => props.shortcutStyle };
  ${props => props.styled };
`;
const StyledLeftIcon = styled.span`
  margin-right: 10px
`
const StyledRightIcon = styled.span`
  margin-left: 10px
`

StyledButton.defaultProps = {
  theme: themes.primary,
  shortcutStyle: themes.styled
}

const Button = ({
  Loading, isLoading, loadingDelay, children, leftIcon, rightIcon, forwardedRef, ...props
}) => {
  const [internalLoading, setInternalLoading] = React.useState(false);
  let timeout = React.useRef(null);
  React.useEffect(() => {
    if(isLoading){
      timeout = setTimeout(() => {
        setInternalLoading(isLoading);
      }, loadingDelay);
    }
    else {
      setInternalLoading(isLoading);
      clearTimeout(timeout);
    }
    return () => {
      clearTimeout(timeout);
    }
  }, [isLoading]);
  return(
    <StyledButton
      isLoading={internalLoading}
      ref={forwardedRef}
      {...props}
    >
      {
        internalLoading ?
        <Loading /> :
        <>
          {leftIcon && <StyledLeftIcon>{leftIcon}</StyledLeftIcon>}
          {children}
          {rightIcon && <StyledRightIcon>{rightIcon}</StyledRightIcon>}
        </>
      }
    </StyledButton>
  )
}

Button.defaultProps = {
  size: "md",
  color: "primary",
  disabled: false,
  isLoading: false,
  loadingDelay: 0,
  Loading: () => <Loading.Dots />
}
Button.propTypes = {
  disabled: PropTypes.bool,
  /**
   * Override loading component
   */
  Loading: PropTypes.elementType,
  /**
   * Delay in milliseconds before show loading
   */
  loadingDelay: PropTypes.number,
  isLoading: PropTypes.bool,
  /**
  Override style
  **/
  className: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
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
}

const ButtonWithRef = forwardRef(Button);
ButtonWithRef.StyledButton = StyledButton;
ButtonWithRef.StyledLeftIcon = StyledLeftIcon;
ButtonWithRef.StyledRightIcon = StyledRightIcon;
export default ButtonWithRef;