import React, { useState, useRef, Component } from 'react';
import { Text, View, StyleSheet, Button, ImageBackground, TouchableOpacity, PermissionsAndroid, Platform, ScrollView, Image, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper'

import { RNCamera } from 'react-native-camera'
import CameraRoll from "@react-native-community/cameraroll";
import { captureScreen } from "react-native-view-shot";

import ImagesCombineLibrary from 'react-native-images-combine';
import axios from 'axios';


const image = [require('./penislol.png'), require('./penisoldschool.png'), require('./superpenis.png'), require('./banana.png'), require('./penis_realiste.png'), require('./loltrump.jpg')];
const url = "https://face-detection-aze.herokuapp.com/";
const widthMobile = Dimensions.get('window').width
const heightMobile = Dimensions.get('window').height



const RenderBarcode = (props) => {
  const stickerRef = useRef(null)
  const { bounds, filter } = props
  // console.log(bounds.origin.x, bounds.origin.y, bounds.size.width, bounds.size.height)
  return (
    <TouchableOpacity onPress={changeFilter}>
      <View
        style={{
          position: 'absolute',
          //borderColor: '#F00',
          justifyContent: 'center',
          width: bounds.size.width,
          height: bounds.size.height,
          left: bounds.origin.x,
          top: bounds.origin.y,
          //width: 100,
          //height: 100,
          //left: 100,
          //top: 100
        }}
        ref={stickerRef}
      >

        <ImageBackground source={image[filter]} style={styles.image}>
        </ImageBackground>

      </View>
    </TouchableOpacity>

  )
};

const createFormData = (photo, body) => {
  const data = new FormData();

  data.append("photo", {
    name: photo.fileName,
    type: photo.type,
    uri:
      Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
  });

  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });

  return data;
};


const CameraComponent = (props) => {
  const { setPicture, picture } = props
  const inputEl = useRef(null);
  const [type, setType] = useState(RNCamera.Constants.Type.back);
  const [face, setFace] = useState(false)
  const [bar, setBar] = useState()
  const [photo, setPhoto] = useState("ntm charly")
  const [filter, setFilter] = useState(0)

  changeFilter = () => {
    if (filter < image.length) {
      setFilter(filter + 1)
    } else {
      setFilter(0)
    }
  }
  

  async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

  const faceDetected = (barcodes) => {
    setBar(barcodes)
    setFace(true)
  }

  takePicture = async () => {
    if (inputEl.current) {
      const options = { quality: 0.1, base64: true };
      const data = await inputEl.current.takePictureAsync(options);
      // console.log(data.uri);

      if (Platform.OS === "android" && !(await hasAndroidPermission())) {
        return;
      }
      // setPhoto(data.uri)
      //const photo = { fileName: "kikolol", type: "image/jpg", uri: data.uri }
      // const dataFinal = createFormData(photo, "azeaze")
      const uri = data.uri.startsWith('file://')
        ? data.uri.substr('file://'.length)
        : data.uri;



      // const taille = [bar.faces[0].bounds.origin.x, bar.faces[0].bounds.origin.y, bar.faces[0].bounds.size.width, bar.faces[0].bounds.size.height];
      // const taille = "[200, 200, 1000, 1000]"
      var dataFinal = new FormData();
      // console.log(data.uri.split('/').slice(-1)[0])
      // console.log("this is uri", uri)
      await CameraRoll.save(data.uri)
      const uriFinal = await CameraRoll.getPhotos({
        first: 1,
        assetType: 'Photos',
      })

      console.log(uriFinal.edges[0].node.image.uri)
      console.log(data.uri.split('/').slice(-1)[0])
      dataFinal.append('photo',
        {
          uri: uriFinal.edges[0].node.image.uri,
          type: 'image/jpg',
          name: data.uri.split('/').slice(-1)[0]
        });
      dataFinal.append('x', bar.faces[0].bounds.origin.x / heightMobile);
      dataFinal.append('y', bar.faces[0].bounds.origin.y / widthMobile);
      dataFinal.append('width', bar.faces[0].bounds.size.width / widthMobile);
      dataFinal.append('height', bar.faces[0].bounds.size.height / heightMobile);
      dataFinal.append('filterNumber', filter)
      //dataFinal.append('x', 100 / widthMobile);
      //dataFinal.append('y', 100 / heightMobile);
      //dataFinal.append('width', 100 / widthMobile);
      //dataFinal.append('height', 100 / heightMobile);
      console.log(dataFinal)
      setPicture({ "uri": uriFinal.edges[0].node.image.uri })
      axios.post(
        url + 'upload',
        //'http://192.168.0.31:5000/upload',
        dataFinal,
        {
          headers: {
            "Accept": "application/json",
            "Content-Type": "multipart/form-data",
          }
        },        
      ).then(response =>{
        console.log(response)
        //setPicture('http://192.168.0.31:5000/' +  data.uri.split('/').slice(-1)[0] + '.png');
        setPicture({uri: url + "zbook/" +  data.uri.split('/').slice(-1)[0] + '.png'});
      }).catch(err => {
          console.log(err.message, err);
          setPicture({uri: url + "zbook/" +  data.uri.split('/').slice(-1)[0] + '.png'});
          // setPicture('http://192.168.0.31:5000/' +  data.uri.split('/').slice(-1)[0] + '.png');
        })
      

      
      /*fetch('https://face-detection-aze.herokuapp.com/upload/', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data'
        },
        method: 'POST',
        body: dataFinal
      }).then(res => console.log(res.data)).catch(err =>  console.log(err.message, err));*/

      // axios.get(url).then(res => console.log(res.data)).catch(err => console.log(err.message, err))
    }
  };



  return (
    <View style={{ flex: 1 }}>
      <RNCamera
        style={{ flex: 1, justifyContent: 'space-between' }}
        ref={inputEl}
        type={type}
        onFacesDetected={(barcodes) => faceDetected(barcodes)}
      >
        <View style={{ flexDirection: 'column', flex: 1 }}>

          <Button color={face ? "green" : "red"} title={"kikou"} onPress={() => { type === RNCamera.Constants.Type.back ? setType(RNCamera.Constants.Type.front) : setType(RNCamera.Constants.Type.back) }}>
          </Button>
          {/*<Text>
              {bar ? bar.target : ""}
            </Text>
            <Text>
              {bar ? `x: ${bar.faces[0].bounds.origin.y}, y: ${bar.faces[0].bounds.origin.y} ` : ""} 
            </Text>
            <Text>
              {bar ? `width: ${bar.faces[0].bounds.size.width}, height: ${bar.faces[0].bounds.size.height} ` : ""} 
            </Text>
            <Text>
              {bar ? `yawAngle: ${bar.faces[0].yawAngle} ` : ""} 
            </Text>
            <Text>
              {bar ? `rollAngle: ${bar.faces[0].rollAngle} ` : ""} 
            </Text>
            <Text>
              {bar ? `faceID: ${bar.faces[0].faceID} ` : ""} 
            </Text>
            <Text>
              {bar ? `type: ${bar.type}` : ""}
          </Text> */}
          {
            face ?
              <RenderBarcode bounds={bar.faces[0].bounds} filter={filter} /> :
              <Text>
              </Text>
          }
          
          {/*bounds={bar.faces[0].bounds} filter={filter} />*/}
        </View >
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={takePicture} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={changeFilter} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> ZGEG </Text>
          </TouchableOpacity>
        </View>
        <Text>{photo}</Text>
      </RNCamera >
    </View >
  )
}




const styles = StyleSheet.create({
  container: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  slideDefault: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default CameraComponent