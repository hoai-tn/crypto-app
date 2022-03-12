import { View, Text, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { IconTextButton } from "../components";
import { COLORS, icons, SIZES } from "../constants";

function MainLayout({ children, isTradeModalVisible }) {
  const modalAnimatedValue = useRef(new Animated.Value(0)).current;
  // listening isTradeModalVisible change
  useEffect(() => {
    if (isTradeModalVisible) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [isTradeModalVisible]);
  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height - 259],
  });
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {children}
      {isTradeModalVisible && (
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundColor: COLORS.transparentBlack,
          }}
          opacity={modalAnimatedValue}
        />
      )}
      <Animated.View
        style={{
          position: "absolute",
          width: "100%",
          left: 0,
          top: modalY,
          padding: SIZES.padding,
          backgroundColor: COLORS.primary,
        }}
      >
        <IconTextButton
          label="Transfer"
          icon={icons.send}
          onPress={() => console.log("transfer")}
        />
        <IconTextButton
          label="Withdraw"
          icon={icons.withdraw}
          containerStyle={{
            marginTop: SIZES.base,
          }}
          onPress={() => console.log("Withdraw")}
        />
      </Animated.View>
    </View>
  );
}

function mapStateToProps(state) {
  return {
    isTradeModalVisible: state.tabReducer.isTradeModalVisible,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setTradeModalVisibility: (isVisible) => {
      return dispatch(setTradeModalVisibility(isVisible));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
