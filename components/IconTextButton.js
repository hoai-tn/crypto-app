import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants";

export default function IconTextButton({
  label,
  icon,
  containerStyle,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
        ...containerStyle,
      }}
      onPress={onPress}
    >
      <Image
        source={icon}
        resizeMode="contain"
        style={{ height: 20, width: 20, marginRight: 3 }}
      />
      <Text
        style={{
          fontWeight: "bold",
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
