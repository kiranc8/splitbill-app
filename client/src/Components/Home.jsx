import { React } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AliceCarousel from "react-alice-carousel";
import icon from "../assets/85353-business-lottie-animation.gif";
import "react-alice-carousel/lib/alice-carousel.css";
const Home = () => {
  const navigate = useNavigate();
  const carouseldata = [
    "on trip",
    "with housemates",
    "with your partner",
    "with anyone",
  ];
  const isLoggedIn = localStorage.getItem("loggedIn");

  const handleClick = () => {
    isLoggedIn ? navigate("/group") : navigate("/login");
  };
  return (
    <div>
      <Container
        sx={{
          display: "flex",
          marginTop: "100px",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: { md: "row", xs: "column" },
          fontFamily: "PT Sans",
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: { md: "50%", xs: "100%" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: { xs: "center", md: "flex-start" },
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "25px", md: "35px" },
              fontWeight: { xs: "600", md: "800" },
              textAlign: { xs: "center", md: "left" },
              color: "#383b3f",
            }}
          >
            Less stress when sharing expenses
          </Typography>
          <AliceCarousel
            autoPlay
            autoPlayInterval={1800}
            animationDuration={2000}
            disableButtonsControls
            disableDotsControls
            infinite
            disableSlideInfo
            touchTracking={false}
          >
            {carouseldata.map((item) => (
              <Typography
                sx={{
                  fontSize: { xs: "25px", md: "35px" },
                  fontWeight: { xs: "600", md: "800" },
                  textAlign: { xs: "center", md: "left" },
                  marginBottom: "20px",
                  color: "#383b3f",
                }}
                key={item}
              >
                {item}
              </Typography>
            ))}
          </AliceCarousel>
          <Box sx={{ marginBottom: "20px" }}>
            <svg
              style={{
                fill: "#1cc29f",
                width: "50px",
                height: "50px",
                marginRight: "10px",
              }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 36 35"
            >
              <path d="M7.844 0L1.961 3.5l11.766 7 3.922 2.333L9.805 17.5 3.922 14 0 16.333l3.922 2.334 1.961 1.166L3.922 21l1.961 1.167V24.5l1.961-1.167v7L11.766 28v-7l7.844-4.667V35l3.922-2.333 1.96-1.167v-7l1.962-1.167V21l-1.961 1.167v-2.334l1.96-1.166v-2.334l-1.96 1.167v-4.667l5.883-3.5L35.298 7V4.667L33.337 3.5l-9.805 5.833L19.61 7l1.961-1.167-1.961-1.166-1.961 1.166-1.961-1.166 1.96-1.167-1.96-1.167L13.727 3.5z"></path>
            </svg>
            <svg
              style={{
                fill: "#8656cd",
                width: "50px",
                height: "50px",
                marginRight: "10px",
              }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 34 32"
            >
              <path d="M27.736 15.229V31.02H20.56V22.6h-7.177v8.423H6.207V15.228l7.176-4.211 3.588-2.106 10.765 6.317zm-.03-6.335l5.412 3.176v2.106H29.53l-12.559-7.37-12.558 7.37H.824V12.07l16.147-9.475 7.177 4.211V.49h3.557v8.405z"></path>
            </svg>
            <svg
              style={{
                fill: "#a6002f",
                width: "50px",
                height: "50px",
                marginRight: "10px",
              }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 31 29"
            >
              <path d="M15.163 4.311L7.653-.043.143 4.311v15.237l15.02 8.707 15.02-8.707V4.311l-7.51-4.354z"></path>
            </svg>
            <svg
              style={{
                fill: "#383b3f",
                width: "50px",
                height: "50px",
                marginRight: "10px",
              }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 29 30"
            >
              <path d="M11.673.979v9.055L3.519 5.506.461 10.6l8.154 4.528-8.154 4.527L3.52 24.75l8.154-4.528v9.056h6.115V20.22l8.154 4.528L29 19.655l-8.154-4.527L29 10.6l-3.058-5.094-8.154 4.528V.979z"></path>
            </svg>
          </Box>
          <Box sx={{ display: { md: "none" } }}>
            <img src={icon} alt="" style={{ width: "100%", height: "100%" }} />
          </Box>
          <Typography
            sx={{
              marginBottom: "20px",
              textAlign: { xs: "center", md: "left" },
            }}
          >
            Keep track of your shared expenses and balances with housemates,
            trips, groups, friends, and family.
          </Typography>
          <Button
            variant="contained"
            sx={{
              width: "120px",
              height: "50px",
              marginBottom: "20px",
              backgroundColor: "#1cc29f",
              "&:hover": {
                backgroundColor: "#1cc29f",
              },
            }}
            onClick={handleClick}
          >
            Start
          </Button>
        </Box>
        <Box
          sx={{
            height: "100%",
            width: "50%",
            display: { md: "flex", xs: "none" },
            alignItems: "center",
          }}
        >
          <img src={icon} alt="" style={{ width: "100%", height: "100%" }} />
        </Box>
      </Container>
    </div>
  );
};

export default Home;
