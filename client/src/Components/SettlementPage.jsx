import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "../assets/72991-payer.gif";
import { baseUrl } from "./Constants";
const SettlementPage = () => {
  const groupId = new URLSearchParams(useLocation().search).get("groupId");
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const token = localStorage.getItem("authToken");
  useEffect(() => {
    axios
      .get(`${baseUrl}/expense/settle?groupId=${groupId}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        if (err.response.status === 403 || err.response.status === 401) {
          navigate("/login");
        }
      });
  }, []);
  return (
    <div>
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
          {data.map((item) => {
            return (
              <Typography
                sx={{
                  fontSize: { md: "25px", xs: "18px" },
                  textAlign: "center",
                }}
              >
                {item}
              </Typography>
            );
          })}
        </Box>
      </Container>
    </div>
  );
};

export default SettlementPage;
