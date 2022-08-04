import { React, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
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
import signUpIcon from "../assets/animation_500_l621xk2t.gif";
import Loader from "./Loader";
import { baseUrl } from "./Constants";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passErr, setPassErr] = useState("");
  const [passConfErr, setConfPassErr] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const showLoader = () => {
    setLoader(true);
  };
  const hideLoader = () => {
    setLoader(false);
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        validateField(name, value);
        break;
      case "password":
        setPassword(value);
        validateField(name, value);
        if (confirmpassword === value) {
          setConfPassErr("");
        }
        break;
      case "confirmpassword":
        setConfirmPassword(value);
        if (value === "") {
          setConfPassErr("");
        } else if (!password) {
          setConfPassErr("Please Enter password");
        } else if (password !== value) {
          setConfPassErr("Password and Confirm Password does not match.");
        } else {
          setConfPassErr("");
        }
        break;
      default:
        break;
    }
  };
  const validateField = (name, value) => {
    if (name === "email") {
      let emailRegx =
        /^([a-z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*)?@[a-z][a-zA-Z-9]*\.[a-z]+(\.[a-z]+)?)|[7-9][0-9]{9}$/;
      if (value === "") {
        setEmailErr("");
      } else if (!value.match(emailRegx)) {
        setEmailErr("Enter a valid Email");
      } else {
        setEmailErr("");
      }
    } else {
      let passwordRegx =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      if (value === "") {
        setPassErr("");
      } else if (!value.match(passwordRegx)) {
        setPassErr(
          "Password must have atleast 8 char one uppercase one lowercase one special case and one number"
        );
      } else {
        setPassErr("");
      }
    }
  };

  const handleSubmit = (e) => {
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      confirmpassword === ""
    ) {
      setErrorMsg("All fields are required");
      setOpen(true);
    } else if (emailErr || passErr || passConfErr) {
      setErrorMsg("Please enter valid credentials");
      setOpen(true);
    } else {
      e.preventDefault();
      let formObj = {
        name: name,
        email: email,
        password: password,
      };
      formSubmit(formObj);
    }
  };

  const formSubmit = (formObj) => {
    showLoader();
    axios
      .post(`${baseUrl}/user/register`, formObj)
      .then((response) => {
        if (response.data === "Registered Successfully") {
          hideLoader();
          setOpen(true);
          navigate("/login");
        } else {
          setErrorMsg(response.data);
          hideLoader();
          setOpen(true);
        }
      })
      .catch((err) => {
        setErrorMsg(err.message);
        hideLoader();
        setOpen(true);
      });
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
              minHeight: "73vh",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: { md: "row", xs: "column" },
            }}
          >
            <Box
              sx={{
                height: "100%",
                width: "50%",
                display: { md: "flex", xs: "none" },
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={signUpIcon}
                alt=""
                style={{ width: "600px", height: "600px" }}
              />
            </Box>
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
                  Sign up
                </Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  onChange={handleChange}
                  id="name"
                  label="Full Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  value={name}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  onChange={handleChange}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  helperText={emailErr}
                  error={emailErr ? true : false}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  onChange={handleChange}
                  value={password}
                  helperText={passErr}
                  error={passErr ? true : false}
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
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmpassword"
                  label="Confirm Password"
                  onChange={handleChange}
                  value={confirmpassword}
                  helperText={passConfErr}
                  error={passConfErr ? true : false}
                  type="password"
                  id="confirmpassword"
                  autoComplete="confirm-password"
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
                  Sign up
                </Button>
              </Container>
            </Box>
          </Container>
          <Snackbar autoHideDuration={4000} open={open} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              {errorMsg}
            </Alert>
          </Snackbar>
        </>
      )}
    </div>
  );
};

export default Signup;
