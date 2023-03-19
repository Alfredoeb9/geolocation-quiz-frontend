import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";

//! Not Working Don't Push or Deploy

const AmazonAdd = () => {
  const [amazonId, setamazonId] = useState("");
  const [amazonSrc, setamazonSrc] = useState("");

  useEffect(() => {
    setamazonId("amzn-assoc-ad-b14a52ba-f95b-4330-838f-47deab2cec43");
    setamazonSrc(
      "//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US&adInstanceId=b14a52ba-f95b-4330-838f-47deab2cec43"
    );
  }, []);

  return (
    <div className="amz-ad-container">
      <Helmet>
        <script className="amazonSrc" async src={amazonSrc} />
      </Helmet>
      <div id={amazonId}></div>
    </div>
  );
};

export default AmazonAdd;
