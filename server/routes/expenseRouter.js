const express = require("express");
const router = express.Router();
const {
  createGroup,
  addExpense,
  getGroups,
  getExpense,
  getMembers,
  deleteExpense,
  deleteGroup,
} = require("../controller/expenseController");
const settle = require("../controller/settlement");
const { verifyToken } = require("../Authentication/auth");
router.post("/creategroup", verifyToken, (req, res) => {
  console.log(req.body);
  const { userId, groupname, members } = req.body;
  createGroup(userId, groupname, members)
    .then((result) => {
      if (result) {
        res.send(result);
      }
    })
    .catch((err) => {
      res.send(err.message);
    });
});

router.post("/addexpense", verifyToken, (req, res, next) => {
  const { groupId, person, title, amount } = req.body;
  addExpense(groupId, person, title, amount)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err.message);
    });
});

router.get("/getgroup", verifyToken, (req, res, next) => {
  const { userId } = req.query;
  getGroups(userId)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get("/getmembers", verifyToken, (req, res, next) => {
  const { groupId } = req.query;
  getMembers(groupId)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get("/getexpense", verifyToken, (req, res, next) => {
  const { groupId } = req.query;
  getExpense(groupId)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.delete("/deleteexpense", verifyToken, (req, res) => {
  const { expenseId } = req.query;
  deleteExpense(expenseId)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => res.send(err));
});

router.delete("/deletegroup", verifyToken, (req, res) => {
  const { groupId } = req.query;
  deleteGroup(groupId)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => res.send(err));
});

router.get("/settle", verifyToken, (req, res) => {
  const { groupId } = req.query;
  settle(groupId)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => res.send(err));
});

module.exports = router;
