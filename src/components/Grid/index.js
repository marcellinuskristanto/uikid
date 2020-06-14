import React from 'react';
import styled, {css} from 'styled-components';
import PropTypes from 'prop-types';
import themes from '../themes';

const StyledGrid = styled.div`
  ${props => props.shortcutStyle};
  ${props => props.container && StyledGridContainer}
  ${props => props.item && StyledGridItem}
  ${props => props.styled}
`

const StyledGridContainer = css`
  display: flex;
  justify-content: ${props => props.justifyContent};
  align-items: ${props => props.alignItems};
  flex-wrap: ${props => props.wrap};
`

const StyledGridItem = css`
  max-width: 100%;
  ${props => {
    if(props.autoWidth){
      return `
        flex-basis: 0;
        flex-grow: 1;
        flex-shrink: 0;
      `
    }
    return `
      flex-basis: ${props.xs / 12 * 100}%;
      width: ${props.xs / 12 * 100}%;
    `
  }}
  ${props => Object.keys(props.theme.breakpoint).map((key) => {
    if(props[key]){
      return `
        @media (min-width: ${props.theme.breakpoint[key]}){
          flex-basis: ${props[key] / 12 * 100}%;
          width: ${props[key] / 12 * 100}%;
        }
      `
    }
  })}
`

StyledGrid.defaultProps = {
  theme: themes.primary,
  shortcutStyle: themes.styled
}

const Grid = ({wrap, children, ...props}) => {
  return (
    <StyledGrid
      wrap={wrap ? "wrap" : "nowrap"}
      {...props}
    >
      {children}
    </StyledGrid>
  )
}

Grid.defaultProps = {
  autoWidth: false,
  wrap: true,
  direction: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  container: false,
  item: false,
  xs: 12
}

Grid.propTypes = {
  alignItems: PropTypes.string,
  /**
  Use autowidth on grid item
  **/
  autoWidth: PropTypes.bool,
  container: PropTypes.bool,
  direction: PropTypes.string,
  item: PropTypes.bool,
  justifyContent: PropTypes.string,
  /**
  Add custom style inside styled components
  **/
  styled: PropTypes.string,
  /**
  flex-wrap property
  **/
  wrap: PropTypes.bool,
  /**
  Default breakpoint
  **/
  xs: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
  Override breakpoint in theme.breakpoint.sm
  **/
  sm: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
  Override breakpoint in theme.breakpoint.md
  **/
  md: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
  Override breakpoint in theme.breakpoint.lg
  **/
  lg: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default Grid;