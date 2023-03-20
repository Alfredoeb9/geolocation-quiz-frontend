import React, { useEffect, useState } from "react";
import postscribe from "postscribe";

//! Not Working Don't Push or Deploy

const AmazonAdd = () => {
  const [amazonId, setamazonId] = useState("");
  const [amazonSrc, setamazonSrc] = useState("");
  const [amazonSrc2, setamazonSrc2] = useState("");

  useEffect(() => {
    const div = document.createElement("div");
    div.id = "amzn_assoc_ad_div_adunit0_0";
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US`;
    const s = document.createElement("script");
    s.type = "text/javascript";
    const code = `amzn_assoc_placement = "adunit0";
    amzn_assoc_tracking_id = "geographquizw-20";
    amzn_assoc_ad_mode = "search";
    amzn_assoc_ad_type = "smart";
    amzn_assoc_marketplace = "amazon";
    amzn_assoc_region = "US";
    amzn_assoc_default_search_phrase = "geography books";
    amzn_assoc_default_category = "All";
    amzn_assoc_linkid = "71b3b06beeaebf8447b5a04bf61e7869";
    amzn_assoc_title = "Consider Purhcasing A Geography Book";
    amzn_assoc_search_bar = "false";
    amzn_assoc_search_bar_position = "top"`;

    s.appendChild(document.createTextNode(code));
    postscribe(
      "#amazon-search-container",
      `<script
    language="javascript"
    src="//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US"
  ></script>`
    );
    const dom = document.getElementById("amazon-search-container");
    if (dom) {
      dom.appendChild(s);
      dom.appendChild(script);
    }

    // postscribe()
    // postscribe(
    //   "#amzn-assoc-ad-b14a52ba-f95b-4330-838f-47deab2cec43",
    //   '<script async src="//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US&adInstanceId=b14a52ba-f95b-4330-838f-47deab2cec43"></script>'
    // );
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
      {/* <Helmet>
        <script className="amazonSrc" async src={amazonSrc} />
      </Helmet> */}
      <div
        // dangerouslySetInnerHTML={{ __html: amazonSrc }}
        id="amazon-search-container"
      ></div>
      {/* <div  id={amazonId}></div> */}
    </div>
  );
};

export default AmazonAdd;
