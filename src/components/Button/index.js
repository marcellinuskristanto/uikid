import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import themes from '../themes';
import {cssjoin, cssautosize} from '../../helpers';
import Loading from '../Loading';

const StyledButton = styled.button`
  font-size: ${props =>
    cssautosize(props.size, {
      sm: props.themex.fxs,
      md: props.themex.fmd,
      lg: props.themex.flg,
    })
  };
  padding: ${props =>
    cssautosize(props.size, {
      sm: cssjoin(props.themex.pxxs, props.themex.psm),
      md: cssjoin(props.themex.pxs, props.themex.psm),
      lg: cssjoin(props.themex.pxs, props.themex.pmd),
    })
  };
  border-radius: 3px;
  color: ${props => props.themex.colors[props.color].text};
  background-color: ${props => props.themex.colors[props.color].main};
  border: none;
  outline: none;
  cursor: pointer;
  transition: background-color 0.3s ease-in;
  pointer-events: ${props => props.isLoading && "none"};
  &:hover {
    background-color: ${props => props.themex.colors[props.color].dark};
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
  themex: themes.primary,
  shortcutStyle: themes.styled
}

const Button = ({
  Loading, isLoading, loadingDelay, children, leftIcon, rightIcon, ...props
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
  color: PropTypes.oneOf(['primary', 'secondary', 'plain']),
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
}

Button.StyledButton = StyledButton;
Button.StyledLeftIcon = StyledLeftIcon;
Button.StyledRightIcon = StyledRightIcon;
export default Button;