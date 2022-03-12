import React, { useCallback } from "react";
import { View, Text } from "react-native";
import MainLayout from "./MainLayout";
import { connect } from "react-redux";
import { getHoldings, getCoinMarket } from "../stores/market/marketAction";
import { useFocusEffect } from "@react-navigation/native";
import { SIZES, COLORS, FONTS, dummyData, icons } from "../constants";
import { BalanceInfo } from "../components";
const Home = ({ myHoldings, coins, getHoldings, getCoinMarket }) => {
  useFocusEffect(
    useCallback(() => {
      getHoldings((holdings = dummyData.holdings));
      getCoinMarket();
    }, [])
  );
  function renderWalletInfoSection() {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          backgroundColor: COLORS.gray,
        }}
      >
        <BalanceInfo
          title="Your wallet"
          displayAmount="45,000"
          changePercent="2.30"
          containerStyle={{ marginTop: 50 }}
        />
      </View>
    );
  }
  return (
    <MainLayout>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.black,
        }}
      >
        {/* Header - Wallet Info */}
        {renderWalletInfoSection()}
        {/* Chart */}
        {/* Top Cryptocurrency */}
      </View>
    </MainLayout>
  );
};

function mapStateToProps({ marketReducer }) {
  return {
    myHoldings: marketReducer.myHoldings,
    coins: marketReducer.coins,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getHoldings: (
      holdings,
      currency,
      orderBy,
      sparkline,
      priceChangePerc,
      perPage,
      page
    ) => {
      return dispatch(
        getHoldings(
          holdings,
          currency,
          orderBy,
          sparkline,
          priceChangePerc,
          perPage,
          page
        )
      );
    },
    getCoinMarket: (
      currency,
      orderBy,
      sparkline,
      priceChangePerc,
      perPage,
      page
    ) => {
      return dispatch(
        getCoinMarket(
          currency,
          orderBy,
          sparkline,
          priceChangePerc,
          perPage,
          page
        )
      );
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
