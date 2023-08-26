import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import React, { useEffect, useState, useRef } from "react";
import { Typography } from "@mui/material";

function SlideView(props) {
  const slideRef = useRef();
  const [chartSize, setChartSize] = useState({ width: 0, height: 0 });
  const resizeChart = () => {
    const width = (7 / 10) * slideRef.current.offsetWidth;
    const height = (3 / 5) * width;
    setChartSize({ width, height });
  };
  useEffect(() => {
    resizeChart();
  }, []);
  useEffect(() => {
    window.addEventListener("resize", resizeChart);
  }, []);
  const data = props.slide?.options;
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 10px",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",
          border: "1px solid #ddd",
        }}
        ref={slideRef}
      >
        <Typography
          flexWrap={"wrap"}
          fontSize={"1.5rem"}
          fontWeight={"bold"}
          textAlign={"center"}
          p={1}
        >
          {props.slide.question}
        </Typography>
        <BarChart data={data} width={chartSize.width} height={chartSize.height}>
          <XAxis dataKey="option" stroke="#778899" />
          <YAxis />
          <Tooltip wrapperStyle={{  backgroundColor: "#ccc" }} />
          <Legend
            width={100}
            wrapperStyle={{
              bottom: 5,
              right: 0,
              backgroundColor: "#f5f5f5",
              border: "1px solid #d5d5d5",
              borderRadius: 3,
              lineHeight: "40px",
            }}
          />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Bar dataKey="count" fill="#778899" barSize={30} />
        </BarChart>
      </div>
    </div>
  );
}
export default SlideView;
