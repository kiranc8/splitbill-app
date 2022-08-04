import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Image from "../assets/72991-payer.gif";
import { baseUrl } from "./Constants";
import Loader from "./Loader";
const SettlementPage = () => {
  const groupId = new URLSearchParams(useLocation().search).get("groupId");
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const token = localStorage.getItem("authToken");
  useEffect(() => {
    showLoader();
    axios
      .get(`${baseUrl}/expense/settle?groupId=${groupId}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setData(response.data);
        hideLoader();
      })
      .catch((err) => {
        if (err.response.status === 403 || err.response.status === 401) {
          navigate("/login");
        }
      });
  }, []);

  const showLoader = () => {
    setLoader(true);
  };
  const hideLoader = () => {
    setLoader(false);
  };
  return (
    <div>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Container
            sx={{
              display: "flex",
              minHeight: "80vh",
              flexDirection: { md: "row", xs: "column" },
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: { md: "50%", xs: "100%" },
                display: "flex",
                flexDirection: "column",
              }}
            >
              <img src={Image} alt="" />
            </Box>
            <Box
              sx={{
                width: { md: "50%", xs: "100%" },
                marginTop: { md: "0", xs: "50px" },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography sx={{ marginBottom: "10px", fontSize: "20px" }}>
                Suggested payments
              </Typography>
              <Table
                sx={{
                  borderTop: "1px solid gray",
                  borderBottom: "1px solid gray",
                }}
              >
                <TableBody>
                  {data.map((item) => {
                    return (
                      <TableRow
                        key={item.from}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="left">{item.from}</TableCell>
                        <TableCell align="center">owes</TableCell>
                        <TableCell align="center">{item.to}</TableCell>
                        <TableCell align="right">INR{item.amount}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </Container>
        </>
      )}
    </div>
  );
};

export default SettlementPage;
