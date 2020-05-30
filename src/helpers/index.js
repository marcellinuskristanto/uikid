import React from 'react';
import {css} from 'styled-components';

export function cssjoin(){
  return Array.prototype.join.call(arguments, " ");
}
export function cssautosize(size, params){
  if(size==="sm" || size==="lg" || size==="md"){
    return params[size];
  }
  else{
    return size;
  }
}
export function cssautothemesize(size, theme, type="p"){
  const key = type+size;
  return theme[key] || size;
}
export function cssautocolor(color, theme, type="main"){
  // if(color==="primary" || color==="secondary" || color==="default"){
  //   return theme.colors[color][type];
  // }
  // else {
  //   return color;
  // }
  return (theme.colors[color] && theme.colors[color][type]) || color;
}

export const Box = (props) => {
  const {style} = props;
  return(
    <div style={{display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100px", background: "lightblue", ...style}}>
      <span style={{textAlign: "center"}}>{props.children}</span>
    </div>
  )
}