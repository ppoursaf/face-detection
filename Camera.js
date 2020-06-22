import React, { useState,  } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

import { RNCamera } from 'react-native-camera'


const CameraComponent = () => {
  const [type, setType] = useState(RNCamera.Constants.Type.back);
  const [face, setFace] = useState(false)
  const [bar, setBar] = useState()

  const faceDetected = (barcodes) => {
    setBar(barcodes)
    setFace(true)
  }


  return (
    <View style={{ flex: 1 }}>
      <RNCamera
        style={{ flex: 1, alignItems: 'center' }}
        ref={ref => {
          camera = ref
        }}
        type={type}
        onFacesDetected={(barcodes) => faceDetected(barcodes)}
      >

        <Button color={face ? "green" : "red" } title={"kikou"} onPress={() => { type === RNCamera.Constants.Type.back ? setType(RNCamera.Constants.Type.front) : setType(RNCamera.Constants.Type.back) }}>
        </Button>
        <Text>
          {bar ? bar.target : ""}
        </Text>
        <Text>
          {bar ? `x: ${bar.faces[0].bounds.origin.y}, y: ${bar.faces[0].bounds.origin.y} `: ""} {/* bounds, yawAngle, rollAngle, faceID*/}
        </Text>
        <Text>
          {bar ? `width: ${bar.faces[0].bounds.size.width}, height: ${bar.faces[0].bounds.size.height} `: ""} {/* bounds, yawAngle, rollAngle, faceID*/}
        </Text>
        <Text>
          {bar ? `yawAngle: ${bar.faces[0].yawAngle} `: ""} {/* bounds, yawAngle, rollAngle, faceID*/}
        </Text>
        <Text>
          {bar ? `rollAngle: ${bar.faces[0].rollAngle} `: ""} {/* bounds, yawAngle, rollAngle, faceID*/}
        </Text>
        <Text>
          {bar ? `faceID: ${bar.faces[0].faceID} `: ""} {/* bounds, yawAngle, rollAngle, faceID*/}
        </Text>
        <Text>
          {bar ? `faceID: ${Object.keys(bar)} `: ""} {/* bounds, yawAngle, rollAngle, faceID*/}
        </Text>
        <Text>
          {bar ? bar.type : ""}
        </Text>

        
      </RNCamera>
    </View>
  )
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default CameraComponent