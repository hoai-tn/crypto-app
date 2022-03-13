import { View, Text, Image } from "react-native";
import React from "react";
import { COLORS, FONTS, icons, SIZES } from "../constants";

export default function BalanceInfo({
  title,
  displayAmount,
  changePercent,
  containerStyle,
}) {
  return (
    <View style={{ ...containerStyle }}>
      <Text
        style={{
          ...FONTS.h3,
          color: COLORS.lightGray3,
        }}
      >
        {title}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
        }}
      >
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.lightGray3,
          }}
        >
          $
        </Text>
        <Text
          style={{
            marginLeft: SIZES.base,
            color: COLORS.white,
            ...FONTS.h2,
          }}
        >
          {(displayAmount).toLocaleString('en-US')}
        </Text>
        <Text
          style={{
            color: COLORS.lightGray3,
            ...FONTS.h3,
          }}
        >
          {" "}
          USD
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
        }}
      >
        {changePercent != 0 && (
          <Image
            source={icons.upArrow}
            resizeMode="contain"
            style={{
              height: 10,
              width: 10,
              alignSelf: "center",
              marginRight: 3,
              tintColor: changePercent > 0 ? COLORS.lightGreen : COLORS.red,
              transform: [{ rotate: changePercent > 0 ? "45deg" : "125deg" }],
            }}
          />
        )}
        <Text
          style={{
            marginLeft: SIZES.base,
            alignSelf: "flex-end",
            color:
              changePercent == 0
                ? COLORS.lightGray3
                : changePercent > 0
                ? COLORS.lightGreen
                : COLORS.red,
            ...FONTS.h4,
          }}
        >
          {changePercent.toFixed(2)}%
        </Text>
        <Text
          style={{
            marginLeft: SIZES.base,
            color: COLORS.lightGray3,
            alignSelf: "center",
          }}
        >
          7d change
        </Text>
      </View>
    </View>
  );
}
