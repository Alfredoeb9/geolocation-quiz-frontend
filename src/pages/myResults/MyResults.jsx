import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getResultData } from "../../hooks/usePostResult";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./results.css";

function MyResults() {
  const { id } = useParams();
  const { username } = useSelector((state) => state.user.user);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getResultData(
        `${process.env.REACT_APP_API_URL}/result/${id}`,
        { username }
      );

      setData(response);
    };

    fetchData();
  }, [id, username]);

  return (
    <TableContainer className="results" component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className="table-header">
          <TableRow className="table-row">
            <TableCell>Name</TableCell>
            <TableCell>Attemps</TableCell>
            <TableCell>Earn Points</TableCell>
            <TableCell>Result</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length == 0 && (
            <div>
              No Results found for category!{" "}
              <Link to={`/geoquiz/${id}`}>Take a test?</Link>{" "}
            </div>
          )}
          {data.map((v, i) => (
            <TableRow className="table-body" key={i}>
              <TableCell>{v?.username || ""}</TableCell>
              <TableCell>{v?.attempts || 0}</TableCell>
              <TableCell>{v?.points || 0}</TableCell>
              <TableCell>{v?.achived || ""}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MyResults;
