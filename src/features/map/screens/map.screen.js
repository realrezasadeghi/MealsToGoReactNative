import styled from "styled-components/native";
import MapView from "react-native-maps";
import { SearchMap } from "../components/search.component";
import { useContext, useEffect, useState } from "react";
import { LocationContext } from "../../../services/location/location.context";
import { RestaurantContext } from "../../../services/restaurant/restaurant.context";
import { MapCallout } from "../components/map-callout.component";

const Map = styled(MapView)`
  width: 100%;
  height: 100%;
`;

export const MapScreen = ({ navigation }) => {
  const { location } = useContext(LocationContext);
  const { restaurants } = useContext(RestaurantContext);
  const { viewport, lat, lng } = location;
  const [latDelta, setLateDelta] = useState(0);

  useEffect(() => {
    const northeastLat = viewport.northeast.lat;
    const southwestLat = viewport.southwest.lat;

    setLateDelta(northeastLat - southwestLat);
  }, [location, viewport]);

  console.log('reza');

  return (
    <>
      <SearchMap />
      <Map
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: latDelta,
          longitudeDelta: 0.2,
        }}
      >
        {restaurants.map((restaurant) => {
          return (
            <Map.Marker
              key={restaurant.name}
              name={restaurant.name}
              coordinate={{
                latitude: restaurant.geometry.location.lat,
                longitude: restaurant.geometry.location.lng,
              }}
            >
              <MapView.Callout
                onPress={() =>
                  navigation.navigate("RestaurantDetail", { restaurant })
                }
              >
                <MapCallout restaurant={restaurant} />
              </MapView.Callout>
            </Map.Marker>
          );
        })}
      </Map>
    </>
  );
};
