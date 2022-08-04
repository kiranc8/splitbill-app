import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/system";

const Navbar = () => {
  const navigate = useNavigate();
  let isLoggedIn = localStorage.getItem("loggedIn");

  const logout = () => {
    localStorage.clear();
    navigate('/login')
  };

  const login = () => {navigate('/login')};

  const signUp = () => {navigate('/signup')};

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "80px",
      }}
    >
      <Container>
        <AppBar
          sx={{
            backgroundColor: "#ffffff",
            maxWidth: "100%",
          }}
          elevation={0}
        >
          <Toolbar sx={{ width: { md: "80%", xs: "95%" }, margin: "0 auto" }}>
            <Typography
              sx={{
                color: "#3c3a3a",
                marginLeft: { md: "10px", xs: "0px" },
                fontSize: { sm: "25px", xs: "20px" },
                fontWeight: "800",
                cursor: "pointer",
              }}
              onClick={()=>navigate('/')}
            >
              Splitit
            </Typography>
            {isLoggedIn ? (
              <>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#1cc29f",
                    "&:hover": {
                      backgroundColor: "#1cc29f",
                    },
                    marginLeft: "auto",
                  }}
                  onClick={logout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="text"
                  sx={{ color: "#1cc29f", marginLeft: "auto" }}
                  onClick={login}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  disableFocusRipple={true}
                  sx={{
                    backgroundColor: "#1cc29f",
                    "&:hover": {
                      backgroundColor: "#1cc29f",
                    },
                    marginLeft: "10px",
                  }}
                  onClick={signUp}
                >
                  Sign up
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Container>
    </div>
  );
};

export default Navbar;
