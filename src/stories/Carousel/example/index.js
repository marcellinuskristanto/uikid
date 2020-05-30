import React from 'react';
import {Button, Carousel} from '../../../components';

const CarouselEx = ({...props}) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const onPrev = () => {
    if(activeIndex===0){
      return setActiveIndex(3);
    }
    return setActiveIndex(activeIndex-1);
  }
  const onNext = () => {
    if(activeIndex===3){
      return setActiveIndex(0);
    }
    return setActiveIndex(activeIndex+1);
  }
  const onChange = (index) => {
    if (activeIndex !== index) {
      setActiveIndex(index);
    }
  }
  return(
    <>
      <Button onClick={onPrev}>Prev</Button>
      <Button onClick={onNext}>Next</Button>
      <Carousel
        {...props}
        activeIndex={activeIndex}
        onChange={onChange}
      >
        {props.children}
      </Carousel>
    </>
  )
}

export default CarouselEx;