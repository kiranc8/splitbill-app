const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const groupSchema = Schema(
  {
    userId: String,
    groupId: String,
    groupname: Object,
    members: Array,
    date: String,
  },
  { collection: "Group" }
);

const expenseSchema = Schema(
  {
    expenseId: String,
    groupId: String,
    person: String,
    title: String,
    date: String,
    amount: Number,
  },
  { collection: "Expense" }
);

const Group = mongoose.model("Group", groupSchema);
const Expense = mongoose.model("Expense", expenseSchema);

module.exports = { Group, Expense };
