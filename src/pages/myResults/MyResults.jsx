import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getResultData } from "../../hooks/usePostResult";

function MyResults() {
  const { id } = useParams();
  const { username } = useSelector((state) => state.user.user);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getResultData(
        `http://localhost:4000/api/result/${id}`,
        { username }
      );

      setData(response);
    };

    fetchData();
  }, [id, username]);

  console.log(data);

  return (
    <div>
      <table>
        <thead className="table-header">
          <tr className="table-row">
            <td>Name</td>
            <td>Attemps</td>
            <td>Earn Points</td>
            <td>Result</td>
          </tr>
        </thead>
        <tbody>
          {data.length == 0 && (
            <div>
              No Results found for category!{" "}
              <Link to={`/geoquiz/${id}`}>Take a test?</Link>{" "}
            </div>
          )}
          {data.map((v, i) => (
            <tr className="table-body" key={i}>
              <td>{v?.username || ""}</td>
              <td>{v?.attempts || 0}</td>
              <td>{v?.points || 0}</td>
              <td>{v?.achived || ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyResults;
