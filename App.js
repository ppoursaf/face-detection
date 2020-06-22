
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Container, Content } from 'native-base'
import Swiper from 'react-native-swiper'

import CameraComponent from './Camera'


const styles = StyleSheet.create({
  slideDefault: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',

  }
})

export default function App() {
  const [scrollEnabled, setScrollEnabled] = useState(true)

  /*const verticalScroll = (index) => {
      if (index !== 1) {
          setScrollEnabled(false)
      }
      else {
          setScrollEnabled(true)
      }
  }*/

  console.log(scrollEnabled)

  return (
    <Container>
      <Content>
        <Swiper
          loop={false}
          showsPagination={false}
          index={1}
        >
          <View style={styles.slideDefault} >
            <Text style={styles.text}> Chat </Text>
          </View>
          <Swiper
            loop={false}
            horizontal={false}
            showsPagination={false}
            index={1}
          // onIndexChanged={(index) => verticalScroll(index)}
          >
            <View style={styles.slideDefault}>
              <Text style={styles.text}> Search </Text>
            </View>
            <View style={{ flex: 1 }}>
              <CameraComponent />
            </View>
            <View style={styles.slideDefault}>
              <Text style={styles.text}> Memories </Text>
            </View>
          </Swiper>
          <View style={styles.slideDefault}>
            <Text style={styles.text}> Stories </Text>
          </View>
        </Swiper>
      </Content>
    </Container>
  );
}