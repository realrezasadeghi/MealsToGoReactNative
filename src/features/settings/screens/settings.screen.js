import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useContext, useRef, useState } from "react";
import { ImageBackground, TouchableOpacity, View } from "react-native";
import { Avatar, List } from "react-native-paper";
import styled from "styled-components/native";
import { SafeArea } from "../../../components/safe-area/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BottomSheetCamera } from "../components/bottom-sheet.component";
import * as ImagePicker from "expo-image-picker";

export const SettingsScreen = ({ navigation }) => {
  const { onLogout, user } = useContext(AuthenticationContext);
  const [photo, setPhoto] = useState(null);
  const bottomSheetRef = useRef(null);

  const SettingItem = styled(List.Item)`
    padding: ${(props) => props.theme.space[2]};
    background-color: rgba(255, 255, 255, 0.4);
    margin: ${(props) => props.theme.space[1]};
    border-radius: 5px;
  `;

  const AvatarContainer = styled(View)`
    align-items: center;
  `;

  const SettingImageBackground = styled(ImageBackground).attrs({
    source: require("../../../../assets/home.jpg"),
  })`
    flex: 1;
  `;

  const getPictureProfile = async (uid) => {
    const pictureUri = await AsyncStorage.getItem(`${uid}-photo`);
    setPhoto(pictureUri);
  };

  const handleRemoveImage = async () => {
    AsyncStorage.removeItem(`${user.uid}-photo`);
    bottomSheetRef.current.close();
    setPhoto(null);
  };

  const handleSelectImageFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      AsyncStorage.setItem(`${user.uid}-photo`, result.uri);
      setPhoto(result.uri);
    }
    bottomSheetRef.current.close();
  };

  const setRefCamera = (ref) => {
    bottomSheetRef.current = ref;
  };

  useFocusEffect(
    useCallback(() => {
      getPictureProfile(user.uid);
    }, [user])
  );

  const AvatarIcon = () => (
    <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
      <Avatar.Icon size={100} icon="human" backgroundColor="#2182BD" />
    </TouchableOpacity>
  );

  const AvatarImage = () => (
    <TouchableOpacity onPress={() => bottomSheetRef.current.open()}>
      <Avatar.Image size={100} source={{ uri: photo }} />
    </TouchableOpacity>
  );

  return (
    <SettingImageBackground>
      <SafeArea>
        <AvatarContainer>
          <Spacer position="top" size="medium">
            {!photo ? <AvatarIcon /> : <AvatarImage />}
          </Spacer>
          <Spacer position="top" size="large">
            <Text variant="label">{user.email}</Text>
          </Spacer>
        </AvatarContainer>
        <List.Section>
          <SettingItem
            title="Favorites"
            description="View your favorites"
            left={(props) => (
              <List.Icon {...props} color="black" icon="heart" />
            )}
            onPress={() => navigation.navigate("Favorites")}
          />
          <SettingItem
            title="Cart"
            description="View your cart"
            left={(props) => <List.Icon {...props} color="black" icon="cart" />}
            onPress={() => navigation.navigate("Cart")}
          />
          <SettingItem
            title="Map"
            description="View your maps"
            left={(props) => <List.Icon {...props} color="black" icon="map" />}
            onPress={() => navigation.navigate("Cart")}
          />
          <SettingItem
            title="Logout"
            left={(props) => <List.Icon {...props} color="black" icon="door" />}
            onPress={onLogout}
          />
        </List.Section>
        <BottomSheetCamera
          setRef={setRefCamera}
          deleteImage={handleRemoveImage}
          navigation={navigation}
          selectImageFromGallery={handleSelectImageFromGallery}
        />
      </SafeArea>
    </SettingImageBackground>
  );
};
