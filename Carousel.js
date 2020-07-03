import React from 'react'
import {Text} from 'react-native'
import Carousel from 'react-native-snap-carousel';


const CarouselComponent = () => {
    return (
        <Carousel
  sliderWidth={SLIDER_WIDTH}
  itemWidth={ITEM_WIDTH}
  activeSlideAlignment={'start'}
  inactiveSlideScale={1}
  inactiveSlideOpacity={1}
/>
    )
}

export default CarouselComponent