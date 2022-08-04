import { React, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import DeleteIcon from "@mui/icons-material/Delete";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { Container } from "@mui/system";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import background from "../assets/facets.png";
import { baseUrl } from "./Constants";
import Loader from "./Loader";
const ExpensePage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [expensedata, setExpensedata] = useState([]);
  const [groupmembers, setGroupmembers] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [person, setPerson] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loader, setLoader] = useState(true);
  const token = localStorage.getItem("authToken");
  const groupId = new URLSearchParams(useLocation().search).get("groupId");
  useEffect(() => {
    axios
      .get(`${baseUrl}/expense/getexpense?groupId=${groupId}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setExpensedata(response.data);
        hideLoader();
      })
      .catch((err) => {
        if (err.response.status === 403 || err.response.status === 401) {
          navigate("/login");
        }
      });

    axios
      .get(`${baseUrl}/expense/getmembers?groupId=${groupId}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setGroupmembers(response.data);
      })
      .catch((err) => {
        if (err.response.status === 403 || err.response.status === 401) {
          navigate("/login");
        }
      });
  }, []);

  const loadData = () => {
    axios
      .get(`${baseUrl}/expense/getexpense?groupId=${groupId}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setExpensedata(response.data);
        handleClose();
      })
      .catch((err) => {
        if (err.response.status === 403 || err.response.status === 401) {
          navigate("/login");
        }
      });
  };

  const settleUp = () => {
    navigate(`/settle?groupId=${groupId}`);
  };

  const deleteGroup = () => {
    axios
      .delete(`${baseUrl}/expense/deletegroup?groupId=${groupId}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        navigate("/group");
      })
      .catch((err) => {
        if (err.response.status === 403 || err.response.status === 401) {
          navigate("/login");
        }
      });
  };
  const deleteExpense = (expenseId) => () => {
    showLoader();
    axios
      .delete(`${baseUrl}/expense/deleteexpense?expenseId=${expenseId}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setSuccessMsg(response.data);
        setOpenSnackbar(true);
        loadData();
        hideLoader();
      })
      .catch((err) => {
        if (err.response.status === 403 || err.response.status === 401) {
          navigate("/login");
        }
      });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "" || amount === "" || person === "") {
      setErrorMsg("Please fill all fields");
      setOpenSnackbar(true);
    } else {
      let formObj = {
        groupId: groupId,
        title: title,
        amount: amount,
        person: person,
      };
      formSubmit(formObj);
    }
  };

  const formSubmit = (formObj) => {
    showLoader();
    axios
      .post(`${baseUrl}/expense/addexpense`, formObj, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response) {
          setSuccessMsg(response.data);
          handleClose();
          hideLoader();
          setOpenSnackbar(true);
          loadData();
        }
      })
      .catch((err) => {
        if (err.response.status === 403 || err.response.status === 401) {
          navigate("/login");
        }
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "78vh",
              maxHeight: "78vh",
              overflowX: "scroll",
              padding: "5px",
            }}
          >
            <TableContainer
              component={Paper}
              sx={{ backgroundImage: `url(${background})` }}
            >
              <Table aria-label="simple table">
                <TableBody>
                  {expensedata.map((item) => (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      key={item.expenseId}
                    >
                      <TableCell component="th" scope="row">
                        {item.title}
                      </TableCell>
                      <TableCell align="right">{item.person}</TableCell>
                      <TableCell align="right">{item.date}</TableCell>
                      <TableCell align="right">{item.amount}</TableCell>
                      <TableCell align="right">
                        <DeleteIcon
                          sx={{ cursor: "pointer", color: "#1cc29f" }}
                          onClick={deleteExpense(item.expenseId)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "5px",
              }}
            >
              {expensedata.length === 0 ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <h1 style={{ textAlign: "center" }}>No expense</h1>
                  <p style={{ textAlign: "center" }}>
                    Add an expense by pressing the button below
                  </p>
                </div>
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: "#1cc29f",
                    "&:hover": { backgroundColor: "#1cc29f" },
                    marginTop: "10px",
                  }}
                  onClick={settleUp}
                >
                  Settle up
                </Button>
              )}
            </Box>
          </Container>

          <Dialog open={open} onClose={handleClose} maxWidth="xs">
            <DialogTitle>New expense</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Easy to share bills with your friends and anyone
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="title"
                label="Title"
                type="text"
                fullWidth
                variant="standard"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                autoFocus
                margin="dense"
                id="amount"
                label="Amount"
                type="number"
                fullWidth
                variant="standard"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <FormControl sx={{ mt: 2, minWidth: 220 }}>
                <InputLabel htmlFor="By">By</InputLabel>

                <Select
                  autoFocus
                  label="By"
                  inputProps={{
                    name: "By",
                    id: "by",
                  }}
                  value={person}
                  onChange={(e) => setPerson(e.target.value)}
                >
                  {groupmembers.map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
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
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>
          <Box>
            <SpeedDial
              ariaLabel="SpeedDial basic example"
              sx={{ position: "absolute", bottom: 5, right: 16 }}
              icon={<SpeedDialIcon />}
              FabProps={{
                sx: {
                  bgcolor: "#1cc29f",
                  "&:hover": {
                    bgcolor: "#1cc29f",
                  },
                },
              }}
            >
              <SpeedDialAction
                key={"delete"}
                icon={<DeleteIcon />}
                tooltipTitle={"Delete group"}
                onClick={deleteGroup}
              />
              <SpeedDialAction
                key={"expense"}
                icon={<ReceiptIcon />}
                tooltipTitle={"New expense"}
                onClick={handleClickOpen}
              />
            </SpeedDial>
          </Box>
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

export default ExpensePage;
