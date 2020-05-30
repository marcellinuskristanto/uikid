import React from 'react';
import {Preview as BlockPreview} from '@storybook/addon-docs/blocks';
import styled, { createGlobalStyle } from 'styled-components';

const StyledPreview = styled(BlockPreview)`
  overflow: visible;
  &, & .css-1ilulqq{
    z-index: 2;
  }
  & .css-gnhv4i{
    overflow: visible;
  }
`

export const Preview = (props) => {
  return(
    <StyledPreview {...props}/>
  )
}
export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  h1,h2,h3,h4,h5,h6,p{
    margin-top: 0;
  }
`