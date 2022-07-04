import React, { useEffect, useState, useRef, useContext } from "react";
import { Camera } from "expo-camera";
import { IconButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled from "styled-components/native";

import { Text, TouchableOpacity, View } from "react-native";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

const ProfileCamera = styled(Camera)`
  width: 100%;
  height: 100%;
`;
const InnerSnap = styled.View`
  width: 100%;
  height: 100%;
  z-index: 999;
`;

const ContainerChangeCamera = styled.View`
  position: absolute;
  background-color: blue;
  border-radius: 50px;
  bottom: 60px;
  left: 45%;
`;

export const CameraScreen = ({ navigation }) => {
  const cameraRef = useRef();
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
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

  const handleChangeCamera = () => {
    const isCheckTypeCamera =
      type === Camera.Constants.Type.front
        ? Camera.Constants.Type.back
        : Camera.Constants.Type.front;
    setType(isCheckTypeCamera);
  };

  if (hasPermission == null) return null;
  else if (!hasPermission)
    return (
      <View>
        <Text>Not Access</Text>
      </View>
    );
  return (
    <>
      <ProfileCamera ref={(camera) => (cameraRef.current = camera)} type={type}>
        <TouchableOpacity onPress={snap}>
          <InnerSnap />
        </TouchableOpacity>
      </ProfileCamera>
      <ContainerChangeCamera>
        <IconButton
          mode="contained"
          icon="restart"
          color="white"
          onPress={handleChangeCamera}
        />
      </ContainerChangeCamera>
    </>
  );
};
