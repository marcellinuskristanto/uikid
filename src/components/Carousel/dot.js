import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import themes from '../themes';

const StyledContainer = styled.ul`
  display: flex;
  padding-left: 0;
  position: absolute;
  bottom: 0;
  right: 50%;
  transform: translateX(50%);
  list-style: none;
  z-index: 1;
`
const StyledDot = styled.li`
  width: 10px;
  height: 10px;
  background-color: white;
  margin: 0 6px;
  border-radius: 50%;
  cursor: pointer;
  opacity: ${props => props.active ? 1 : 0.3};
  box-shadow: 1px 1px 2px ${props => props.themex.colors.shadow.dot};
  transition: opacity .25s ease-in;
  :hover{
    opacity: 1;
  }
`

StyledContainer.defaultProps = {
  themex: themes.primary,
  shortcutStyle: themes.styled
}
StyledDot.defaultProps = {
  themex: themes.primary,
  shortcutStyle: themes.styled
}

const Dot = ({activeIndex, length, onClick, ...props}) => {
  const renderDot = () => {
    const components = [];
    for(let i=0; i<length; i++){
      components.push(<StyledDot key={i} onClick={() => onClick(i)} active={activeIndex===i} />)
    }
    return components;
  }
  return (
    <StyledContainer {...props}>
      {renderDot()}
    </StyledContainer>
  )
}

Dot.propTypes = {
  onClick: PropTypes.func,
  length: PropTypes.number.isRequired,
  activeIndex: PropTypes.number
}

export default Dot;