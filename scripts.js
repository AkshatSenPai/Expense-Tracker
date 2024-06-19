document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
    const totalIncomeEl = document.getElementById('total-income');
    const totalExpenseEl = document.getElementById('total-expense');
    const netBalanceEl = document.getElementById('net-balance');

    let expenses = [];

    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const description = document.getElementById('description').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const type = document.getElementById('type').value;

        const expense = { description, amount, type };
        expenses.push(expense);

        updateExpenseList();
        updateSummary();
        expenseForm.reset();
    });

    function updateExpenseList() {
        expenseList.innerHTML = '';
        expenses.forEach((expense, index) => {
            const li = document.createElement('li');
            li.innerHTML = `${expense.description} - $${expense.amount.toFixed(2)} (${expense.type})
                            <button onclick="deleteExpense(${index})">Delete</button>`;
            expenseList.appendChild(li);
        });
    }

    function updateSummary() {
        const totalIncome = expenses
            .filter(expense => expense.type === 'income')
            .reduce((acc, curr) => acc + curr.amount, 0);

        const totalExpense = expenses
            .filter(expense => expense.type === 'expense')
            .reduce((acc, curr) => acc + curr.amount, 0);

        const netBalance = totalIncome - totalExpense;

        totalIncomeEl.textContent = `$${totalIncome.toFixed(2)}`;
        totalExpenseEl.textContent = `$${totalExpense.toFixed(2)}`;
        netBalanceEl.textContent = `$${netBalance.toFixed(2)}`;
    }

    window.deleteExpense = function (index) {
        expenses.splice(index, 1);
        updateExpenseList();
        updateSummary();
    }
});
