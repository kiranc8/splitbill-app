import React from "react";
import { Rings } from "react-loader-spinner";
const Loader = () => {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        height: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "none",
      }}
    >
      <Rings
        color="#1cc29f"
        style={{ height: "70vh" }}
        height={80}
        width={80}
      />
    </div>
  );
};

export default Loader;