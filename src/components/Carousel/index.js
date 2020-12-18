import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Dot from './dot';

const StyledCarousel = styled.div`
  position: relative;
  display: flex;
  overflow: hidden;
  width: 100%;
  max-width: 100%;
  user-select: none;
`
const StyledNextArrow = styled.div`
  border-left: 20px solid #FFF;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  margin-right: 10px;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 1;
`
const StyledPrevArrow = styled.div`
  border-right: 20px solid #FFF;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  margin-left: 10px;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 1;
`
const StyledSlide = styled.div`
  & img {
    display: block;
    width: 100%;
    pointer-events: none;
  }
`
const StyledSlider = styled.div.attrs(props => {
  return {
    width: props.totalSlide*100,
    slideWidth: 1/props.totalSlide*100,
  }
})`
  display: flex;
  width: ${props => props.width}%;
  flex-shrink: 0;
  & > ${StyledSlide}{
    flex-basis: ${props => props.slideWidth}%;
    width: ${props => props.slideWidth}%;
  }
`

const angkaSakti = 35;

const Carousel = ({
  activeIndex, autoPlaySpeed, stopOnHover, speed, children, infinite, slideTolerance,
  onChange, showArrow, showDots, forwardedRef, ...props
}) => {
  const totalChildren = children.length,
        totalSlide = totalChildren + (infinite ? 2 : 0),
        startIndex = infinite ? 1 : 0,
        realLastIndex = totalChildren-1,
        internalFirstIndex = 1,
        internalLastIndex = totalChildren,
        fakeLastImageIndex = totalChildren+1,
        fakeFirstImageIndex = 0,
        activeIndexImpure = infinite ? activeIndex+1 : activeIndex,
        refs = React.useRef({
          isTransitioning: false,
          isDragging: false,
          startPos: undefined,
          currentIndexClone: null,
          stopAutoPlay: false,
          autoPlayTimeout: null,
          currentElement: null,
          currentElementX: undefined,
          currentTransform: "",
          dragValue: 0,
        }),
        sliderRef = React.useRef(null),
        nextArrowRef = React.useRef(null),
        prevArrowRef = React.useRef(null),
        [currentIndex, setCurrentIndex] = React.useState(activeIndex!==undefined ? null : startIndex);
  
  const getTransform = (index, dragValue=0) => {
    return `translateX(${(-1*index/totalSlide*100) + dragValue}%)`;
  }
  const getTransition = (speed) => {
    return `transform ${speed}ms ease`;
  }
  const backToFirst = () => {
    sliderRef.current.style.transition = "";
    sliderRef.current.style.transform = getTransform(0, refs.current.dragValue);
    setTimeout(() => {
      sliderRef.current.style.transition = getTransition(speed);
      sliderRef.current.style.transform = getTransform(internalFirstIndex);
      setCurrentIndex(internalFirstIndex);
    }, angkaSakti);
  }
  const backToLast = () => {
    sliderRef.current.style.transition = "";
    sliderRef.current.style.transform = getTransform(fakeLastImageIndex, refs.current.dragValue);
    setTimeout(() => {
      sliderRef.current.style.transition = getTransition(speed);
      sliderRef.current.style.transform = getTransform(internalLastIndex);
      setCurrentIndex(internalLastIndex);
    }, angkaSakti);
  }

  if (activeIndex!==undefined && activeIndexImpure !== currentIndex) {
    if(infinite){
      if(activeIndex===0 && currentIndex===totalChildren){ // kalau balik ke awal
        backToFirst();
      }
      else if(activeIndex===realLastIndex && currentIndex===1){ // kalau balik ke akhir
        backToLast();
      }
      else{
        setCurrentIndex(activeIndexImpure);
      }
    }
    else if(!infinite && activeIndexImpure < totalChildren && activeIndexImpure>=0){
      setCurrentIndex(activeIndexImpure);
    }
    // reset drag value tiap ganti slide
    refs.current.dragValue = 0;
  }

  // Mouse up harus dideclare ulang tiap render, kalau gak value activeIndex di parent nggak berubah
  React.useEffect(() => {
    document.addEventListener("mouseup", mouseUp);
    return () => {
      document.removeEventListener("mouseup", mouseUp);
    }
  }, [activeIndex]);
  React.useEffect(() => {
    document.addEventListener("mousemove", mouseMove);
    sliderRef.current.style.transition = `transform ${speed}ms ease`;

    runAutoPlayifAllowed();

    return () => {
      document.removeEventListener("mousemove", mouseMove);
      clearTimeout(refs.current.autoPlayTimeout);
    }
  }, []);
  React.useEffect(() => {
    refs.current.currentIndexClone = currentIndex;
    refs.current.dragValue = 0;
    sliderRef.current.style.transform= `translateX(${-1*currentIndex/totalSlide*100}%)`;
    runAutoPlayifAllowed();
  }, [currentIndex]);
  
  // wrapper onchange for both internal and external state
  const agnosticIndexChange = (index)  => {
    if(onChange instanceof Function){
      if(infinite){
        if(index===fakeLastImageIndex){ // kalau ke index gambar fake akhir, arahin ke awal
          return onChange(0);
        }
        else if(index===fakeFirstImageIndex){ // kalau ke index gambar fake awal, arahin ke gambar terakhir
          return onChange(realLastIndex);
        }
        return onChange(index-1);
      }
      else{
        return onChange(index);
      }
    }
    else if(index===fakeLastImageIndex){
      backToFirst();
    }
    else if(infinite && index===fakeFirstImageIndex){
      backToLast();
    }
    else{
      return setCurrentIndex(index);
    }
  }
  const isNotOnTheEdge = (index) => {
    return infinite || (!infinite && index!==totalChildren-1);
  }
  const runAutoPlayifAllowed = () => {
    if(autoPlaySpeed){
      runAutoPlay();
    }
  }
  const runAutoPlay = () => {
    clearTimeout(refs.current.autoPlayTimeout);
    refs.current.autoPlayTimeout = setTimeout(() => {
      if(refs.current.stopAutoPlay && stopOnHover) return;
      const index = refs.current.currentIndexClone;
      if(!refs.current.isDragging && isNotOnTheEdge(index)){
        agnosticIndexChange(index+1);
      }
    }, autoPlaySpeed);
  }
  const cursorMove = (e, coordinateX) => {
    if(refs.current.isDragging && refs.current.currentElement){
      if(refs.current.currentElement.style.transition!==""){
        refs.current.currentElement.style.transition = "";
      }
      const containerWidth = refs.current.currentElement.parentElement.offsetWidth,
            dragValue = (-1*(refs.current.startPos-coordinateX)/(containerWidth*totalSlide))*100;     
      refs.current.dragValue = dragValue;
      refs.current.currentElement.style.transform = `translateX(${refs.current.currentElementX + dragValue}%)`;
    }
  }
  const cursorUp = (e, coordinateX) => {
    if(refs.current.isDragging && sliderRef.current.contains(refs.current.currentElement)){
      const startPos = refs.current.startPos;
      refs.current.isDragging = false;
      refs.current.startPos = undefined;

      if(sliderRef.current.style.transition===""){
        sliderRef.current.style.transition = `transform ${speed}ms ease`;
      }
      sliderRef.current.style.transform = refs.current.currentTransform;
      
      if(startPos < coordinateX){
        if((coordinateX - startPos) > slideTolerance){
          if(infinite || (!infinite && refs.current.currentIndexClone!==0)){ // kalau nggak dipojok dan nggak infinite loop
            return agnosticIndexChange(refs.current.currentIndexClone-1);
          }
        }
      }
      else if(startPos > coordinateX){
        if((startPos - coordinateX) > slideTolerance){
          if(infinite || (!infinite && refs.current.currentIndexClone!==realLastIndex)){ // kalau nggak dipojok dan nggak infinite loop
            return agnosticIndexChange(refs.current.currentIndexClone+1);
          }
        }
      }

      return runAutoPlayifAllowed();
    }
  }
  const cursorDown = (e, coordinateX) => {
    if((nextArrowRef.current && nextArrowRef.current.contains(e.target)) || (prevArrowRef.current && prevArrowRef.current.contains(e.target))){
      return;
    }
    refs.current.currentIndexClone = currentIndex;
    refs.current.currentElementX = -1*currentIndex/totalSlide*100;
    refs.current.currentTransform = `translateX(${refs.current.currentElementX}%)`;
    if(sliderRef.current.contains(e.target.parentElement)){
      refs.current.currentElement = sliderRef.current;
      refs.current.isDragging = true;
      refs.current.startPos = coordinateX;
    }
  }

  const dotClick = (index) => {
    if(infinite){
      return agnosticIndexChange(index+1);
    }
    return agnosticIndexChange(index);
  }
  const mouseEnter = (e) => {
    if(stopOnHover){
      refs.current.stopAutoPlay = true;
    }
  }
  const mouseLeave = (e) => {
    if(stopOnHover){
      refs.current.stopAutoPlay = false;
      runAutoPlayifAllowed();
    }
  }
  const mouseMove = (e) => {
    e.stopPropagation();
    cursorMove(e, e.screenX);
  }
  const mouseUp = (e) => {
    e.stopPropagation();
    cursorUp(e, e.screenX);
  }
  const mouseDown = (e) => {
    cursorDown(e, e.screenX);
  }
  const touchMove = (e) => {
    cursorMove(e, e.touches[0].screenX);
  }
  const touchStart = (e) => {
    if(stopOnHover){
      refs.current.stopAutoPlay = true;
    }
    cursorDown(e, e.touches[0].screenX);
  }
  const touchEnd = (e) => {
    cursorUp(e, e.changedTouches[0].screenX);
    if(stopOnHover){
      refs.current.stopAutoPlay = false;
      runAutoPlayifAllowed();
    }
  }
  const prevClick = () => {
    if(!infinite && currentIndex===0){
      return;
    }
    else{
      agnosticIndexChange(currentIndex-1);
    }
  }
  const nextClick = (e) => {
    if(!infinite && currentIndex===totalChildren-1){
      return;
    }
    else{
      agnosticIndexChange(currentIndex+1);
    }
  }
  return (
    <StyledCarousel
      ref={forwardedRef}
      totalSlide={totalSlide}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      onMouseDown={mouseDown}
      onTouchStart={touchStart}
      onTouchMove={touchMove}
      onTouchEnd={touchEnd}
      {...props}
    >
      {showArrow &&
        <>
          <StyledPrevArrow onClick={prevClick} ref={prevArrowRef} />
          <StyledNextArrow onClick={nextClick} ref={nextArrowRef} />
        </>
      }
      {
        showDots && <Dot length={totalChildren} activeIndex={infinite ? (currentIndex===fakeFirstImageIndex ? realLastIndex : (currentIndex===fakeLastImageIndex ? 0 : currentIndex-1)) : currentIndex} onClick={dotClick} />
      }
      <StyledSlider
        totalSlide={totalSlide}
        currentIndex={currentIndex}
        speed={speed}
        infinite={infinite}
        ref={sliderRef}
      >
        {infinite && React.cloneElement(children[totalChildren-1], {
            idx: -1
        })}
        {React.Children.map(children, (child, i) =>{
          return React.cloneElement(child, {
            idx: i
          })
        })}
        {infinite && React.cloneElement(children[0], {
            idx: totalChildren
        })}
      </StyledSlider>
    </StyledCarousel>
  )
}

Carousel.defaultProps = {
  speed: 350,
  infinite: true,
  slideTolerance: 100,
  autoPlaySpeed: 4000,
  stopOnHover: true,
  showArrow: true,
  showDots: true,
}
Carousel.propTypes = {
  speed: PropTypes.number,
  activeIndex: PropTypes.number,
  infinite: PropTypes.bool,
  slideTolerance: PropTypes.number,
  autoPlaySpeed: PropTypes.number,
  showArrow: PropTypes.bool,
  showDots: PropTypes.bool,
  onChange: PropTypes.func,
  /**
   * a flag indicates whether auto play should stop when carousel being hovered
   */
  stopOnHover: PropTypes.bool,
}

Carousel.Slide = StyledSlide;
export default Carousel;