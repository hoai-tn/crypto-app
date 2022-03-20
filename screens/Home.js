import React, { useCallback } from "react";
import { View, Text } from "react-native";
import MainLayout from "./MainLayout";
import { connect } from "react-redux";
import { getHoldings, getCoinMarket } from "../stores/market/marketAction";
import { useFocusEffect } from "@react-navigation/native";
import { SIZES, COLORS, FONTS, dummyData, icons } from "../constants";
import { BalanceInfo, IconTextButton, Chart } from "../components";
const Home = ({ myHoldings, coins, getHoldings, getCoinMarket }) => {
  useFocusEffect(
    useCallback(() => {
      getHoldings((holdings = dummyData.holdings));
      getCoinMarket();
    }, [])
  );
  const totalWallet = myHoldings.reduce((a, b) => a + (b.total || 0), 0);
  const valueChange = myHoldings.reduce(
    (a, b) => a + (b.holdingValueChange7d || 0),
    0
  );
  const percentChange = (valueChange / (totalWallet - valueChange)) * 100;
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
          displayAmount={totalWallet}
          changePercent={percentChange}
          containerStyle={{ marginTop: 50 }}
        />
        <View
          style={{
            flexDirection: "row",
            marginTop: 30,
            marginBottom: -15,
            paddingHorizontal: SIZES.radius,
          }}
        >
          <IconTextButton
            label="Transfer"
            icon={icons.send}
            containerStyle={{
              flex: 1,
              height: 40,
              marginRight: SIZES.radius,
            }}
            onPress={() => console.log("transfer")}
          />

          <IconTextButton
            label="Withdraw"
            icon={icons.withdraw}
            containerStyle={{
              flex: 1,
              height: 40,
            }}
            onPress={() => console.log("Withdraw")}
          />
        </View>
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
        <Chart
          containerStyle={{ marginTop: SIZES.padding * 2 }}
          // chartPrices={coins[0].sparkline_in_7d?.price}
        />

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
