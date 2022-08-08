const { Group, Expense } = require("../models/expenseModel");
const date = new Date();
const generateId = () => {
  const head = Date.now().toString(36);
  const tail = Math.random().toString(36).substr(2);
  return head + tail;
};

const month =["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const createGroup = (userId, groupname, members) => {
  let newgrp = {
    userId: userId,
    groupId: generateId(),
    date:
    `${month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`,
    groupname: groupname,
    members: members,
  };
  return Group.insertMany([newgrp])
    .then((result) => {
      if (result) {
        return "Group Created";
      }
    })
    .catch((err) => {
      return err;
    });
};

const addExpense = (groupId, person, title, amount) => {
  let newexpense = {
    expenseId: generateId(),
    groupId: groupId,
    person: person,
    date:
    `${month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`,
    title: title,
    amount: amount,
  };
  return Expense.insertMany([newexpense])
    .then((result) => {
      if (result) {
        return "Expense added";
      }
    })
    .catch((err) => {
      return err;
    });
};
const getGroups = (userId) => {
  return Group.find({ userId })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};

const getMembers = (groupId) => {
  return Group.find({ groupId })
    .then((result) => {
      if (result.length > 0) {
        return result[0].members;
      } else {
        return [];
      }
    })
    .catch((err) => {
      return err;
    });
};

const getExpense = (groupId) => {
  return Expense.find({ groupId })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};

const deleteExpense = (expenseId) => {
  return Expense.deleteOne({ expenseId })
    .then((result) => {
      return "Deleted Successfully";
    })
    .catch((err) => {
      return err;
    });
};

const deleteGroup = (groupId) => {
  return Group.deleteOne({ groupId })
    .then((result) => {
      return Expense.deleteMany({ groupId }).then((result) => {
        return "Deleted group";
      });
    })
    .catch((err) => {
      return err;
    });
};

module.exports = {
  createGroup,
  addExpense,
  getGroups,
  getExpense,
  getMembers,
  deleteExpense,
  deleteGroup,
};
