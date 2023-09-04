import React, { useEffect, useRef, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";


function SlideShow(props) {
  const { widthRatio } = props;
  const ref = useRef();
  const { slide } = props;
  const [data, setData] = useState();
  const [chartSize, setChartSize] = useState();
  useEffect(() => {
    setData(slide?.results);
  }, [slide]);
  const resizeChart = () => {
    const width = widthRatio * ref.current.offsetWidth;
    const height = (2 / 3) * width;
    setChartSize({ width, height });
  };
  useEffect(() => {
    resizeChart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    window.addEventListener("resize", resizeChart);
  }, []);
  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="multichoice-show-question">
        <h1>{slide?.question}</h1>
      </div>
      <div className="multichoice-show-chart">
        <BarChart
          data={data}
          width={chartSize?.width}
          height={chartSize?.height}
        >
          <XAxis dataKey="option" stroke="#12931a" />
          <YAxis />
          <Tooltip wrapperStyle={{ backgroundColor: "#ccc" }} />
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
          {/* <CartesianGrid stroke="#ccc" strokeDasharray="5 5" /> */}
          <Bar dataKey="count" fill="#12931a" barSize={30} />
        </BarChart>
      </div>
    </div>
  );
}
export default SlideShow;
