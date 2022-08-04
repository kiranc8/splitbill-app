import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container } from "@mui/system";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import InputAdornment from "@mui/material/InputAdornment";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AvatarGroup from "@mui/material/AvatarGroup";
import Chip from "@mui/material/Chip";
import AddIcon from "@mui/icons-material/Add";
import background from "../assets/facets.png";
import { baseUrl } from "./Constants";
import Loader from "./Loader";

const Group = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [chipdata, setChipdata] = useState([]);
  const [groupname, setGroupname] = useState("");
  const [name, setName] = useState("");
  const [groupdata, setGroupdata] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loader, setLoader] = useState(true);
  const token = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    axios
      .get(`${baseUrl}/expense/getgroup?userId=${userId}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setGroupdata(response.data);
        hideLoader();
      })
      .catch((err) => {
        if (err.response.status === 403 || err.response.status === 401) {
          navigate("/login");
        }
      });
  }, []);

  const loadData = () => {
    axios
      .get(`${baseUrl}/expense/getgroup?userId=${userId}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setGroupdata(response.data);
      })
      .catch((err) => {
        setErrorMsg(err.message);
        hideLoader();
        setOpenSnackbar(true);
      });
  };

  const showLoader = () => {
    setLoader(true);
  };
  const hideLoader = () => {
    setLoader(false);
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (index) => {
    setChipdata(
      chipdata
        .slice(0, index)
        .concat(chipdata.slice(index + 1, chipdata.length))
    );
  };

  const addPeople = () => {
    if (name !== "") {
      if (chipdata.includes(name)) {
        setErrorMsg("Already exist");
        setOpenSnackbar(true);
      } else {
        setChipdata((chipdata) => [...chipdata, name]);
        setName("");
      }
    }
  };

  const handleSubmit = (e) => {
    if (groupname === "") {
      setErrorMsg("Enter group name");
      setOpenSnackbar(true);
    } else if (chipdata.length < 2) {
      setErrorMsg("Add atleast two members");
      setOpenSnackbar(true);
    } else {
      e.preventDefault();
      let formObj = {
        userId: userId,
        groupname: groupname,
        members: chipdata,
      };
      formSubmit(formObj);
    }
  };
  const formSubmit = (formObj) => {
    showLoader();
    axios
      .post(`${baseUrl}/expense/creategroup`, formObj, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data === "Group Created") {
          setErrorMsg("");
          setSuccessMsg(response.data);
          setChipdata([]);
          setOpenSnackbar(true);
          loadData();
          handleClose();
          hideLoader();
        } else {
          setErrorMsg(response.data);
          setOpenSnackbar(true);
          hideLoader();
        }
      })
      .catch((err) => {
        if (err.response.status === 403 || err.response.status === 401) {
          navigate("/login");
        } else {
          setErrorMsg(err.message);
          setOpenSnackbar(true);
          hideLoader();
        }
      });
  };

  return (
    <div>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Container sx={{ position: "relative", height: "50px" }}>
            <Tooltip title="create group">
              <Avatar
                sx={{
                  bgcolor: "#1cc29f",
                  position: "absolute",
                  right: "20px",
                  cursor: "pointer",
                }}
                onClick={handleClickOpen}
              >
                <AddIcon />
              </Avatar>
            </Tooltip>
          </Container>
          <Container
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              flexFlow: "column-reverse",
            }}
          >
            {groupdata.length === 0 ? (
              <Container
                sx={{
                  display: "flex",
                  minHeight: "70vh",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography fontSize="25px" fontWeight="600" textAlign="center">
                  Create group by pressing the button
                </Typography>
              </Container>
            ) : (
              groupdata.map((item) => {
                return (
                  <Card
                    sx={{
                      position: "relative",
                      margin: "25px",
                      width: "100%",
                      height: "250px",
                      backgroundImage: `url(${background})`,
                    }}
                    key={item.groupId}
                  >
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h5" component="div">
                        {item.groupname}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Created on {item.date}
                      </Typography>
                      <Box sx={{ display: "flex" }}>
                        <AvatarGroup total={item.members.length}>
                          <Avatar alt="avatar" />
                          <Avatar alt="avatar" />
                          <Avatar alt="avatar" />
                        </AvatarGroup>
                      </Box>
                    </CardContent>
                    <CardActions
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        size="large"
                        variant="contained"
                        sx={{
                          backgroundColor: "#1cc29f",
                          "&:hover": {
                            backgroundColor: "#1cc29f",
                          },
                        }}
                        onClick={() =>
                          navigate(`/bill?groupId=${item.groupId}`)
                        }
                      >
                        Details
                      </Button>
                    </CardActions>
                  </Card>
                );
              })
            )}

            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Create group</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Easy to share bills with your friends and anyone
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Group name"
                  type="email"
                  fullWidth
                  variant="standard"
                  value={groupname}
                  onChange={(e) => setGroupname(e.target.value)}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="addpeople"
                  label="Add people"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip title="Add people" placement="top">
                          <Avatar
                            sx={{
                              // m: 1,
                              marginBottom: "12px",
                              backgroundColor: "#1cc29f",
                              cursor: "pointer",
                            }}
                            onClick={addPeople}
                          >
                            <AddIcon
                              sx={{
                                color: "white",
                              }}
                            />
                          </Avatar>
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                />
                {chipdata.map((item, index) => {
                  return (
                    <Chip
                      label={item}
                      variant="outlined"
                      onDelete={() => handleDelete(index)}
                      sx={{ margin: "5px" }}
                    />
                  );
                })}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>CREATE</Button>
              </DialogActions>
            </Dialog>
          </Container>
          <Snackbar
            autoHideDuration={4000}
            open={openSnackbar}
            onClose={handleCloseSnackbar}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={errorMsg ? "error" : "success"}
              sx={{ width: "100%" }}
            >
              {errorMsg ? errorMsg : successMsg}
            </Alert>
          </Snackbar>
        </>
      )}
    </div>
  );
};

export default Group;
