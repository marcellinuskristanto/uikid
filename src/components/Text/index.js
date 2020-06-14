import React from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';
import themes from '../themes';

const BaseTextStyle = css`
  margin-top: 0;
  margin-bottom: 0;
`
const LineHiddenTextStyle = css`
  display: -webkit-box;
  -webkit-line-clamp: ${props => props.maxLine};
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`
const StyledText = styled.p`
  ${_=>BaseTextStyle}
  ${props => props.maxLine > 0 && LineHiddenTextStyle};
  ${props => props.shortcutStyle};
  ${props => props.styled};
`
StyledText.defaultProps = {theme: themes.primary,shortcutStyle: themes.styled}
const Text = ({h1,h2,h3,h4,h5,h6,p,...props}) => {
  let tag;
  if(h1){tag="h1"}
  else if(h2){tag="h2"}
  else if(h3){tag="h3"}
  else if(h4){tag="h4"}
  else if(h5){tag="h5"}
  else if(h6){tag="h6"}
  else {tag="p"}

  return(
    <StyledText as={tag} {...props}>
      {props.children}
    </StyledText>
  )
}
Text.defaultProps = {
  paragraph: true
}
Text.propTypes = {
  h1: PropTypes.bool,
  h2: PropTypes.bool,
  h3: PropTypes.bool,
  h4: PropTypes.bool,
  h5: PropTypes.bool,
  h6: PropTypes.bool,
  paragraph: PropTypes.bool,
  maxLine: PropTypes.number
}

export default Text;