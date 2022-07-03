import React, { useEffect, useState, useRef, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Camera } from "expo-camera";

import styled from "styled-components/native";
import { Text, TouchableOpacity, View } from "react-native";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

const ProfileCamera = styled(Camera)`
  width: 100%;
  height: 100%;
  flex: 1;
`;
const InnerSnap = styled.View`
  width: 100%;
  height: 100%;
  z-index: 999;
`;

export const CameraScreen = ({ navigation }) => {
  const cameraRef = useRef();
  const [hasPermission, setHasPermission] = useState(null);
  const { user } = useContext(AuthenticationContext);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const snap = async () => {
    if (cameraRef) {
      const pic = await cameraRef.current.takePictureAsync();
      AsyncStorage.setItem(`${user.uid}-photo`, pic.uri);
      navigation.goBack();
    }
  };

  if (hasPermission == null) return null;
  else if (!hasPermission)
    return (
      <View>
        <Text>Not Access</Text>
      </View>
    );
  return (
    <ProfileCamera
      ref={(camera) => (cameraRef.current = camera)}
      type={Camera.Constants.Type.front}
    >
      <TouchableOpacity onPress={snap}>
        <InnerSnap />
      </TouchableOpacity>
    </ProfileCamera>
  );
};
