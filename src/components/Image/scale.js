import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import themes from '../themes';

const StyledImage = styled.img`
  display: block;
  width: 100%;
  ${props => props.shortcutStyle};
  ${props => props.styled};
`
const StyledOverlay = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  background-color: rgba(0,0,0,.5);
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  ${props => props.shortcutStyle};
  ${props => props.styled};
`
const StyledInnerContainer = styled.div`
  transform: scale(1);
  transition: transform 0.2s ease;
  ${props => props.shortcutStyle};
  ${props => props.styled};
`
const StyledContainer = styled.div`
  position: relative;
  overflow: hidden;
  &:hover{
    ${StyledInnerContainer}{
      transform: scale(1.1);
    }
    ${StyledOverlay}{
      display: flex;
    }
  };
  ${props => props.shortcutStyle};
  ${props => props.styled};
`

StyledContainer.defaultProps = {
  themex: themes.primary,
  shortcutStyle: themes.styled
}
StyledInnerContainer.defaultProps = {
  themex: themes.primary,
  shortcutStyle: themes.styled
}
StyledImage.defaultProps = {
  themex: themes.primary,
  shortcutStyle: themes.styled
}
StyledOverlay.defaultProps = {
  themex: themes.primary,
  shortcutStyle: themes.styled
}

const ImageScale = ({
  innerContainerProps,overlayProps,imageProps,
  src, alt, ...props
}) => {
  return(
    <StyledContainer {...props}>
      <StyledInnerContainer {...innerContainerProps}>
        <StyledOverlay {...overlayProps}>
          {props.children}
        </StyledOverlay>
        <StyledImage src={src} alt={alt} {...imageProps}/>
      </StyledInnerContainer>
    </StyledContainer>
  )
}

ImageScale.defaultProps = {
  alt: ""
}
ImageScale.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  innerContainerProps: PropTypes.shape({
    styled: PropTypes.oneOfType([
      PropTypes.string,PropTypes.func
    ])
  }),
  overlayProps: PropTypes.shape({
    styled: PropTypes.oneOfType([
      PropTypes.string,PropTypes.func
    ])
  }),
  imageProps: PropTypes.shape({
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

ImageScale.InnerContainer = StyledInnerContainer;
ImageScale.Overlay = StyledOverlay;
ImageScale.Image = StyledImage;
export default ImageScale;