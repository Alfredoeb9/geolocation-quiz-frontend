import { Link } from "react-router-dom";
import CircularIndeterminate from "../../components/spinner/Spinner";
import useFetch from "../../hooks/useFetch";

/*
    THINGS TO INCLUDE IN US FACT FILE DATA
    1. Capital
    2. Statehood (state number)
    2. Major cities
    3. Population
    4. Area
    5. Bordering States
    6. Nicknames
    7. Mountain Ranges
    8. Rivers
    9. Lakes and Reservoirs
    10. Plateau
    11. Islands
    12. Caves
    13. Canyons
    14. Valleys
    15. National Forests
    16. Notaional Monument
    17. Major Airports
    18. Flag

*/

function FactsAndStats() {
  const { data, loading, error } = useFetch("http://localhost:4000/api/usfact");

  // if (loading) {
  //   <CircularIndeterminate />;
  // }

  // data.map((data) => {
  //   console.log(data);
  // });

  return (
    <div className="quiz">
      <div className="quiz__container">
        {loading ? (
          <CircularIndeterminate />
        ) : (
          <>
            <h1>US Fact Files</h1>
            <p>Pick one US Fact File to learn more about a specific State!</p>

            <div className="quiz__geolocation__container">
              {data.map((data, index) => (
                <div key={index} className="quiz__geolocation__tab">
                  <Link to={`/facts/${data._id}`}>{data.stateName}</Link>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default FactsAndStats;
