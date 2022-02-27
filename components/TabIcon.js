import React from "react";
import { Image, Text, View } from "react-native";
import { FONTS, COLORS } from "../constants";
export default function TabIcon({ focused, icon, label, isTrade }) {
  if (isTrade)
    return (
      <View
        style={{
          alignItems: "center",
          backgroundColor: COLORS.black,
          borderRadius: 30,
          height: 60,
          justifyContent: "center",
          width: 60,
        }}
      >
        <Image
          resizeMode="contain"
          source={icon}
          style={{
            width: 25,
            height: 25,
            tintColor: COLORS.white,
            ...FONTS.h4,
          }}
        />
        <Text
          style={{
            color: COLORS.white,
            ...FONTS.h4,
          }}
        >
          {label}
        </Text>
      </View>
    );
  return (
    <View>
      <Image
        resizeMode="contain"
        source={icon}
        style={{
          width: 25,
          height: 25,
          tintColor: focused ? COLORS.white : COLORS.secondary,
        }}
      />
      <Text
        style={{
          color: focused ? COLORS.white : COLORS.secondary,
          ...FONTS.h4,
        }}
      >
        {label}
      </Text>
    </View>
  );
}
