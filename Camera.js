import React, { useState, } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

import { RNCamera } from 'react-native-camera'


const RenderBarcode = (props) => {
  const { bounds } = props
  return (
    <View
      style={{
        borderWidth: 2,
        borderRadius: 10,
        position: 'absolute',
        borderColor: '#F00',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: 10,
        ...bounds.size,
        left: bounds.origin.x,
        top: bounds.origin.y,
      }}
    >
  

    </View>
  )
};

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

        <Button color={face ? "green" : "red"} title={"kikou"} onPress={() => { type === RNCamera.Constants.Type.back ? setType(RNCamera.Constants.Type.front) : setType(RNCamera.Constants.Type.back) }}>
        </Button>
        <Text>
          {bar ? bar.target : ""}
        </Text>
        <Text>
          {bar ? `x: ${bar.faces[0].bounds.origin.y}, y: ${bar.faces[0].bounds.origin.y} ` : ""} {/* bounds, yawAngle, rollAngle, faceID*/}
        </Text>
        <Text>
          {bar ? `width: ${bar.faces[0].bounds.size.width}, height: ${bar.faces[0].bounds.size.height} ` : ""} {/* bounds, yawAngle, rollAngle, faceID*/}
        </Text>
        <Text>
          {bar ? `yawAngle: ${bar.faces[0].yawAngle} ` : ""} {/* bounds, yawAngle, rollAngle, faceID*/}
        </Text>
        <Text>
          {bar ? `rollAngle: ${bar.faces[0].rollAngle} ` : ""} {/* bounds, yawAngle, rollAngle, faceID*/}
        </Text>
        <Text>
          {bar ? `faceID: ${bar.faces[0].faceID} ` : ""} {/* bounds, yawAngle, rollAngle, faceID*/}
        </Text>
        <Text>
          {bar ? `type: ${bar.type}` : ""}
        </Text>
        {face ?
        <RenderBarcode bounds={bar.faces[0].bounds} /> :
         <Text>
         </Text>
        }
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