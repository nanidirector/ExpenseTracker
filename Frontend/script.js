let transactions = [];

const form = document.getElementById('transaction-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const categoryInput = document.getElementById('category');
const typeInput = document.getElementById('type');

const transactionList = document.getElementById('transaction-list');

const totalIncomeE1 = document.getElementById('total-income');
const totalExpenseE2 = document.getElementById('total-expense');
const totalBalanceE3 = document.getElementById('total-balance');

// ===== Form Submit =====
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const description = descriptionInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const category = categoryInput.value;
  const type = typeInput.value;

  // Create a transaction object
  const newTransaction = {
    id: Date.now(), // unique ID based on current time
    description: description,
    amount: amount,
    category: category,
    type: type
  };

  // 1. Push it into our array
  transactions.push(newTransaction);

  // 2. Call render to draw it on the screen
  render();

  // 3. Reset the form
  form.reset();
  
  // 4. Put the cursor back in the description box
  descriptionInput.focus();
});

// ===== Render Function =====
function render() {
  // 1. Clear the current list
  transactionList.innerHTML = '';
  
  let totalIncome = 0;
  let totalExpense = 0;

  // 2. Loop through every transaction
  transactions.forEach((transaction) => {
    
    // Add to totals
    if (transaction.type === 'income') {
      totalIncome += transaction.amount;
    } else {
      totalExpense += transaction.amount;
    }

    // Create the list item
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    
    li.innerHTML = `
      <div>
        <strong>${transaction.description}</strong>
        <br>
        <small class="text-muted">${transaction.category}</small>
      </div>
      <div>
        <span class="${transaction.type === 'income' ? 'text-success' : 'text-danger'}">
          ${transaction.type === 'income' ? '+' : '-'}₹${transaction.amount.toFixed(2)}
        </span>
      </div>
    `;

    // Add to the page
    transactionList.appendChild(li);
  }); 

  // 3. Update the summary cards (OUTSIDE the loop)
  const balance = totalIncome - totalExpense;

  totalIncomeE1.textContent = `₹${totalIncome.toFixed(2)}`;
  totalExpenseE2.textContent = `₹${totalExpense.toFixed(2)}`;
  totalBalanceE3.textContent = `₹${balance.toFixed(2)}`;
}