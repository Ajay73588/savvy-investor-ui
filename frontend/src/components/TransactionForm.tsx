import { useState } from "react";

const TransactionForm = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // Set default date to today

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = {
      type,
      amount: parseFloat(amount),
      category,
      date,
      description
    };
    
    try {
      const response = await fetch('http://localhost:3001/transactions', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
      const result = await response.json();
      console.log("Transaction submitted:", result);
      
      // Clear form after submission
      setAmount("");
      setDescription("");
      setCategory("");
      // Keep type and date as is
    } catch (error) {
      console.error("Error submitting transaction:", error);
    }
  };

  return (
    <div className="glass p-6 rounded-xl h-full">
      <h2 className="text-xl font-bold mb-4 text-gradient">Add Transaction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
            <option value="investment">Investment</option>
            <option value="transfer">Transfer</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">Amount (₹)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
            required
          >
            <option value="" disabled>Select category</option>
            {type === "expense" && (
              <>
                <option value="food">Food & Dining</option>
                <option value="transportation">Transportation</option>
                <option value="utilities">Utilities</option>
                <option value="entertainment">Entertainment</option>
                <option value="shopping">Shopping</option>
                <option value="healthcare">Healthcare</option>
                <option value="other_expense">Other</option>
              </>
            )}
            {type === "income" && (
              <>
                <option value="salary">Salary</option>
                <option value="freelance">Freelance</option>
                <option value="investment">Investment Returns</option>
                <option value="gifts">Gifts</option>
                <option value="other_income">Other</option>
              </>
            )}
            {type === "investment" && (
              <>
                <option value="crypto">Cryptocurrency</option>
                <option value="stocks">Stocks</option>
                <option value="mutual_funds">Mutual Funds</option>
                <option value="real_estate">Real Estate</option>
                <option value="other_investment">Other</option>
              </>
            )}
            {type === "transfer" && (
              <>
                <option value="account_transfer">Account Transfer</option>
                <option value="loan_payment">Loan Payment</option>
                <option value="credit_card">Credit Card Payment</option>
                <option value="other_transfer">Other</option>
              </>
            )}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add details about this transaction"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
            rows={2}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-all transform hover:scale-[1.02] active:scale-[0.98] mt-4"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;