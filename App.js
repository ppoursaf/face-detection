
import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';

import { Container, Content } from 'native-base'
import Swiper from 'react-native-swiper'

import CameraComponent from './Camera'

import ViewShot, { captureScreen } from "react-native-view-shot";
import CameraRoll from "@react-native-community/cameraroll";


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
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
})




export default function App() {
  const [scrollEnabled, setScrollEnabled] = useState(true)
  const [picture, setPicture] = useState({uri:"https://face-detection-aze.herokuapp.com/7680336d-06ee-4578-b725-0928aabf6a21.jpg.png"})


  console.log(scrollEnabled)


  return (
    <Container>
      <Content>
        <Swiper
          loop={false}
          showsPagination={false}
          index={1}
        >
          <View  style={{ flex: 1 }}>
            <Image
              style={styles.image}
              source={picture}
            />

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
              <CameraComponent setPicture={setPicture} picture={picture} />
            </View>
            <View style={styles.slideDefault}>
              <Text style={styles.text}> Memories </Text>
              {console.log("pictureee", picture)}
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