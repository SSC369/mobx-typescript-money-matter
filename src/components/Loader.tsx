import React from "react";

import { LoaderPropsType } from "../types";

const Loader: React.FC<LoaderPropsType> = ({ width = 30, height = 30 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="50"
      cy="50"
      r="40"
      stroke="#2563eb"
      strokeWidth="10"
      fill="none"
      strokeLinecap="round"
      strokeDasharray="200"
      strokeDashoffset="100"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 50 50"
        to="360 50 50"
        dur="1s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);

export default Loader;
