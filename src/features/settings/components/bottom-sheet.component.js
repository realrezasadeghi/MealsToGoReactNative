import React from "react";
import { View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import styled from "styled-components/native";
import { List } from "react-native-paper";

const RBSheetContainer = styled(View)`
  padding: ${(props) => props.theme.space[2]};
`;

const SettingItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[2]};
`;

export const BottomSheetCamera = ({
  setRef,
  navigation,
  deleteImage,
  selectImageFromGallery,
}) => {
  return (
    <RBSheet ref={setRef} height={200} openDuration={250}>
      <RBSheetContainer>
        <List.Section>
          <SettingItem
            title="Take image from camera"
            left={(props) => (
              <List.Icon {...props} color="black" icon="camera" />
            )}
            onPress={() => navigation.navigate("Camera")}
          />
          <SettingItem
            title="Select image from gallery"
            left={(props) => (
              <List.Icon {...props} color="black" icon="image" />
            )}
            onPress={selectImageFromGallery}
          />
          <SettingItem
            title="Delete Image"
            left={(props) => (
              <List.Icon {...props} color="black" icon="delete" />
            )}
            onPress={deleteImage}
          />
        </List.Section>
      </RBSheetContainer>
    </RBSheet>
  );
};
