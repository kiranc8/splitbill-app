import { React, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import loginIcon from "../assets/50124-user-profile.gif";
import { baseUrl } from "./Constants";
const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    name === "email" ? setEmail(value) : setPassword(value);
    validateField(name, value);
  };
  const validateField = (name, value) => {
    if (name === "email") {
      let emailRegx =
        /^([a-z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*)?@[a-z][a-zA-Z-9]*\.[a-z]+(\.[a-z]+)?)|[7-9][0-9]{9}$/;
      if (value === "") {
        setEmailError("");
      } else if (!value.match(emailRegx) || value === "") {
        setEmailError("Enter a valid Email");
      } else {
        setEmailError("");
      }
    } else {
      let passwordRegx =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      if (value === "") {
        setPasswordError("");
      } else if (!value.match(passwordRegx) || value === "") {
        setPasswordError(
          "Password must have atleast 8 char one uppercase one lowercase one special case and one number"
        );
      } else {
        setPasswordError("");
      }
    }
  };

  const handleSubmit = (e) => {
    if (email === "") {
      setErrorMsg("Please enter email");
      setOpen(true);
    } else if (password === "") {
      setErrorMsg("please enter password");
      setOpen(true);
    } else if (emailError || passwordError) {
      setErrorMsg("Please enter valid username or password");
      setOpen(true);
    } else {
      e.preventDefault();
      let formObj = {
        email: email,
        password: password,
      };
      formSubmit(formObj);
    }
  };
  const formSubmit = (formObj) => {
    axios.post(`${baseUrl}/user/login`, formObj).then((response) => {
      if (response.data) {
        if (
          response.data === "User not available ! Please register" ||
          response.data === "Incorrect username or password"
        ) {
          setErrorMsg(response.data);
          setOpen(true);
        } else {
          localStorage.setItem("loggedIn", true);
          localStorage.setItem("userId", response.data.resp.userId);
          localStorage.setItem("authToken", response.data.token);
          navigate("/group");
        }
      }
    }).catch(err=>{
      setErrorMsg(err.message);
      setOpen(true);
    });
  };

  return (
    <div>
      <Container
        sx={{
          display: "flex",
          minHeight: "75vh",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: { md: "row", xs: "column" },
        }}
      >
        <Box
          sx={{
            width: { md: "50%", xs: "100%" },
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Container
            maxWidth="xs"
            sx={{
              height: "100%",
            }}
          >
            <CssBaseline />
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              onChange={handleChange}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              helperText={emailError}
              error={emailError ? true : false}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              onChange={handleChange}
              value={password}
              helperText={passwordError}
              error={passwordError ? true : false}
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={(e) => setShowPassword(!showPassword)}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#1cc29f",
                padding: "16px",
                mt: 3,
                mb: 2,
                "&:hover": { backgroundColor: "#1cc29f" },
              }}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
          </Container>
        </Box>
        <Box
          sx={{
            height: "100%",
            width: "50%",
            display: { md: "flex", xs: "none" },
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={loginIcon} alt="" style={{ width: "450px" }} />
        </Box>
      </Container>
      <Snackbar autoHideDuration={4000} open={open} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {errorMsg}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
