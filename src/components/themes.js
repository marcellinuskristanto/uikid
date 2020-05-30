import {css} from 'styled-components';
import {cssautothemesize} from '../helpers';

/*
LIST Components uses theme:
  Container : padding, margin, font
  Card      : padding, margin, font
*/

const breakpoint = {
  sm: "600px",
  md: "960px",
  lg: "1280px"
}
const padding = {
  pxxs: "4px",
  pxs: "8px",
  psm: "12px",
  pmd: "16px",
  plg: "24px",
  pxl: "40px",
  pxxl: "60px"
}
const margin = {
  mxxs: "4px",
  mxs: "8px",
  msm: "12px",
  mmd: "16px",
  mlg: "24px",
  mxl: "40px",
  mxxl: "60px"
}
const font = {
  fxxs: "10px",
  fxs: "12px",
  fsm: "14px",
  fmd: "16px",
  flg: "24px",
  fxl: "32px",
  fxxl: "40px"
}

export default {
  primary: {
    colors: {
      primary: {
        main: "#2196F3",
        light: "#90CAF9",
        dark: "#0D47A1",
        text: "white"
      },
      secondary: {
        main: "#9C27B0",
        light: "#CE93D8",
        dark: "#4A148C",
        text: "white"
      },
      plain: {
        main: "#F0F0F0",
        light: "#F6F6F6",
        dark: "#BABABA",
        text: "black",
      },
      error: {
        main: "#FF0000",
        text: "#FF0000"
      },
      default: {
        main: "#BABABA",
        light: "#EEE",
        dark: "#949494",
        text: "black"
      },
      shadow: {
        dot: "black",
      },
      background: "white",
    },
    breakpoint,
    ...font,
    ...margin,
    ...padding
  },
  dark: {
    color:{

    },
    ...font,
    ...margin,
    ...padding
  },
  styled: css`
    padding: ${props=>cssautothemesize(props.p, props.themex)};
    padding-top: ${props=>cssautothemesize(props.pt, props.themex)};
    padding-right: ${props=>cssautothemesize(props.pr, props.themex)};
    padding-bottom: ${props=>cssautothemesize(props.pb, props.themex)};
    padding-left: ${props=>cssautothemesize(props.pl, props.themex)};
    margin: ${props=>cssautothemesize(props.m, props.themex, "m")};
    margin-top: ${props=>cssautothemesize(props.mt, props.themex, "m")};
    margin-right: ${props=>cssautothemesize(props.mr, props.themex, "m")};
    margin-bottom: ${props=>cssautothemesize(props.mb, props.themex, "m")};
    margin-left: ${props=>cssautothemesize(props.ml, props.themex, "m")};
    font-size: ${props=>cssautothemesize(props.f, props.themex, "f")};
    font-weight: ${props => props.fontWeight};
    text-align: ${props => props.textAlign};
    width: ${props => props.w};
    height: ${props => props.h};
    display: ${props => props.display};
    flex-direction: ${props=>props.direction};
    align-items: ${props => props.alignItems};
    justify-content: ${props => props.justifyContent};
  `
}