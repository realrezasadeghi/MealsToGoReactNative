import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useContext, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Avatar, List, IconButton, Colors } from "react-native-paper";
import styled from "styled-components/native";
import { SafeArea } from "../../../components/safe-area/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SettingsScreen = ({ navigation }) => {
  const { onLogout, user } = useContext(AuthenticationContext);
  const [photo, setPhoto] = useState(null);

  const SettingItem = styled(List.Item)`
    padding: ${(props) => props.theme.space[2]};
  `;

  const AvatarContainer = styled(View)`
    align-items: center;
  `;

  const getPictureProfile = async (uid) => {
    const pictureUri = await AsyncStorage.getItem(`${uid}-photo`);
    setPhoto(pictureUri);
  };

  const handleRemoveImage = async () => {
    AsyncStorage.removeItem(`${user.uid}-photo`);
    setPhoto(null);
  };

  useFocusEffect(
    useCallback(() => {
      getPictureProfile(user.uid);
    }, [user])
  );

  return (
    <SafeArea>
      <AvatarContainer>
        <Spacer position="top" size="medium">
          {!photo ? (
            <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
              <Avatar.Icon size={100} icon="human" backgroundColor="#2182BD" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onLongPress={handleRemoveImage}>
              <Avatar.Image size={100} source={{ uri: photo }} />
            </TouchableOpacity>
          )}
        </Spacer>
        <Spacer position="top" size="large">
          <Text variant="label">{user.email}</Text>
        </Spacer>
        {photo && (
          <Spacer position="top" size="medium">
            <IconButton
              icon="camera"
              size={30}
              color={Colors.blue600}
              onPress={() => navigation.navigate("Camera")}
            />
          </Spacer>
        )}
      </AvatarContainer>
      <List.Section>
        <SettingItem
          title="Favorites"
          description="View your favorites"
          left={(props) => <List.Icon {...props} color="black" icon="heart" />}
          onPress={() => navigation.navigate("Favorites")}
        />
        <SettingItem
          title="Logout"
          left={(props) => <List.Icon {...props} color="black" icon="door" />}
          onPress={onLogout}
        />
      </List.Section>
    </SafeArea>
  );
};
