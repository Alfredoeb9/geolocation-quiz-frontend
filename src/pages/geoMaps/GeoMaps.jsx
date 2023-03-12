import { Link } from "react-router-dom";
import { useJsApiLoader, GoogleMap } from "@react-google-maps/api";
import CircularIndeterminate from "../../components/spinner/Spinner";

const center = { lat: 38.889484, lng: -77.035278 };

function GeoMaps() {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) {
    return <CircularIndeterminate />;
  }

  return (
    <div>
      <div
        style={{
          position: "absolute",
          left: "0",
          top: "0",
          height: "100%",
          width: "100%",
        }}
      >
        <GoogleMap
          center={center}
          zoom={8}
          mapContainerStyle={{ width: "100%", height: "100%" }}
        >
          <div className="maps-return-button">
            <Link to={"/"}>Go Back</Link>
          </div>
        </GoogleMap>
      </div>
    </div>
  );
}

export default GeoMaps;
