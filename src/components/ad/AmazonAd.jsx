import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";

//! Not Working Don't Push or Deploy

const AmazonAdd = () => {
  const [amazonId, setamazonId] = useState("");
  const [amazonSrc, setamazonSrc] = useState("");
  const [amazonSrc2, setamazonSrc2] = useState("");

  useEffect(() => {
    setamazonSrc2(
      '<div class="alignleft"> <script type="text/javascript"> amzn_assoc_ad_type = "banner"; amzn_assoc_marketplace = "amazon"; amzn_assoc_region = "US"; amzn_assoc_placement = "assoc_banner_placement_default"; amzn_assoc_campaigns = "kuft"; amzn_assoc_banner_type = "category"; amzn_assoc_p = "48"; amzn_assoc_isresponsive = "false"; amzn_assoc_banner_id = ID; amzn_assoc_width = "728"; amzn_assoc_height = "90"; amzn_assoc_tracking_id = "reater-20"; amzn_assoc_linkid = "asoc_linked"; </script> <script src="//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US&adInstanceId=b14a52ba-f95b-4330-838f-47deab2cec43"></script> </div>'
    );
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
      <div
        // dangerouslySetInnerHTML={{ __html: amazonSrc }}
        id="amzn-assoc-ad-b14a52ba-f95b-4330-838f-47deab2cec43"
      ></div>
      {/* <div  id={amazonId}></div> */}
    </div>
  );
};

export default AmazonAdd;
