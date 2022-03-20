import React from "react";
import { View } from "react-native";

import moment from "moment";
import { COLORS, SIZES } from "../constants";
// import { monotoneCubicInterpolation } from "@rainbow-me/animated-charts";
// import { ChartPath, ChartPathProvider } from "@rainbow-me/animated-charts";
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
      {data.length > 0 && (
        // <ChartPathProvider data={{ points, somsmoothingStrateg: "bezier" }}>
        //   <ChartPath
        //     height={150}
        //     width={SIZES.width}
        //     stroke={COLORS.lightGreen}
        //     strokeWidth={2}
        //   />
        // </ChartPathProvider>
        <Text>asd</Text>
      )}
    </View>
  );
};
