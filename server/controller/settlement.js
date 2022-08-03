const { Group, Expense } = require("../models/expenseModel");
const { getMembers, getExpense } = require("./expenseController");

const settle = async (groupId) => {
  let Members = await getMembers(groupId);
  let Expenses = await getExpense(groupId);
  let total = 0;
  let result = [];
  Members.map((member) => {
    let sum = 0;
    Expenses.map((item) => {
      if (member === item.person) {
        sum += item.amount;
        total += item.amount;
      }
    });
    result.push({ member, sum });
  });

  let mean = total / Members.length;

  share = result.map((item) => {
    return {
      member: item.member,
      share: item.sum - mean,
    };
  });
  share.sort((a, b) => {
    return a.share - b.share;
  });

  if (share.every((val, i, arr) => val.share === arr[0].share)) {
    return ["No payment"];
  }

  let left = 0;
  let right = share.length - 1;

  const answer = [];

  while (left < right) {
    if (-share[left].share > share[right].share) {
      answer.push(
        `${share[left].member} owes ${share[right].member} INR${share[
          right
        ].share.toFixed(2)} `
      );
      share[left].share += share[right].share;
      right--;
    } else {
      answer.push(
        `${share[left].member} owes ${share[right].member} INR${-share[
          left
        ].share.toFixed(2)} `
      );
      left++;
    }
  }

  return answer;
};

module.exports = settle;
