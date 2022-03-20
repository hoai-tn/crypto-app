import React from "react";
import { View } from "react-native";

import moment from "moment";
import { COLORS, SIZES } from "../constants";
// import { monotoneCubicInterpolation } from "@rainbow-me/animated-charts";
// import { ChartPath, ChartPathProvider } from "@rainbow-me/animated-charts";
import { VictoryLine, VictoryChart, VictoryAxis, VictoryLabel } from "victory-native";
export default Chart = ({ containerStyle, chartPrices }) => {
  // points
  const startUnixTimestamp = moment().subtract(7, "day").unix();
  // console.log(startUnixTimestamp);
  const data = chartPrices
    ? chartPrices?.map((item, index) => {
        return {
          x: startUnixTimestamp + (index + 1) * 3600,
          y: item,
        };
      })
    : [];
  // const points = monotoneCubicInterpolation({ data, range: 40 });
  return (
    <View style={{ ...containerStyle }}>
      <VictoryChart padding={25} height={250}>
        <VictoryAxis dependentAxis />
        <VictoryLine
          style={{
            data: { stroke: COLORS.lightGreen },
          }}
          padding={0}
          data={[
            { x: 1, y: 2 },
            { x: 2, y: 3 },
            { x: 1, y: 2 },
            { x: 2, y: 3 },
            { x: 3, y: 5 },
            { x: 4, y: 4 },
          ]}
        />
      </VictoryChart>
    </View>
  );
};
