import React from "react";

const Progress_bar = ({ bgcolor, progress, height }) => {
  const Parentdiv = {
    height: height,
    width: "190px",
    backgroundColor: "whitesmoke",
    borderRadius: 40,
    
    
  };

  const Childdiv = {
    height: "100%",
    width: `${progress <= 100 ? progress : 100}%`,
    backgroundColor: "blue",
    borderRadius: 40,
    textAlign: "right",
  };
 return (
    <div style={Parentdiv}>
      <div style={Childdiv}></div>
    </div>
  );
};

export default Progress_bar;
