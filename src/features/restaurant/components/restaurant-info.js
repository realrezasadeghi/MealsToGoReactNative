import { SvgXml } from "react-native-svg";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import {
  Address,
  Icon,
  Info,
  Rating,
  RestaurantCard,
  RestaurantCardCover,
  Section,
  SectionEnd,
} from "./restaurant-info.styles";

import star from "../../../../assets/star";
import open from "../../../../assets/open";
import { Favorite } from "../../../components/favorites/favorite.component";

export const RestaurantInfo = ({ restaurant = {} }) => {
  const {
    name = "this is test",
    icon = "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
    photos = [
      "https://www.foodiesfeed.com/wp-content/uploads/2021/01/tangerines-and-mangosteen-at-a-market-1024x768.jpg.webp",
    ],
    address = "mashhad",
    rating = 4,
    isOpenNow = true,
    isClosedTemporarily = true,
    placeId,
  } = restaurant;

  const ratingArray = Array.from(new Array(Math.ceil(rating)));

  return (
    <RestaurantCard>
      <RestaurantCardCover source={{ uri: photos[0] }} key={name} />
      <Favorite restaurant={restaurant} />
      <Info>
        <Text variant="label">{name}</Text>
        <Section>
          <Rating>
            {ratingArray.map((item, index) => (
              <SvgXml
                xml={star}
                width={20}
                height={20}
                key={`star-${placeId}-${index}`}
              />
            ))}
          </Rating>
          <SectionEnd>
            {isClosedTemporarily && (
              <Text variant="error">Closed Temporarily</Text>
            )}
            <Spacer position="left" size="large">
              {isOpenNow && <SvgXml xml={open} width={20} height={20} />}
            </Spacer>
            <Spacer position="left" size="large">
              <Icon source={{ uri: icon }} />
            </Spacer>
          </SectionEnd>
        </Section>
        <Address>{address}</Address>
      </Info>
    </RestaurantCard>
  );
};
