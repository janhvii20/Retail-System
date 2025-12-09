export const DataTable = ({ transactions, loading }) => {
  if (loading) {
    return <div className="text-center py-10 text-gray-600">Loading transactions...</div>;
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        <h3 className="text-lg font-semibold mb-2">No transactions found</h3>
        <p className="text-sm">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white">
      <table className="w-full text-xs border-collapse min-w-max">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-4 py-3 text-left font-semibold text-gray-700 border-r border-gray-200">Transaction ID</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700 border-r border-gray-200">Date</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700 border-r border-gray-200">Customer ID</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700 border-r border-gray-200">Customer name</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700 border-r border-gray-200">Phone Number</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700 border-r border-gray-200">Gender</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700 border-r border-gray-200">Age</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700 border-r border-gray-200">Product Category</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700 border-r border-gray-200">Quantity</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700 border-r border-gray-200">Total Amount</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700 border-r border-gray-200">Customer region</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700 border-r border-gray-200">Product ID</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Employee name</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx._id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="px-4 py-3 text-gray-700 border-r border-gray-200">{tx.transactionId}</td>
              <td className="px-4 py-3 text-gray-700 border-r border-gray-200">{new Date(tx.date).toLocaleDateString('en-IN')}</td>
              <td className="px-4 py-3 text-gray-700 border-r border-gray-200">{tx.customerId}</td>
              <td className="px-4 py-3 text-gray-700 border-r border-gray-200">{tx.customerName}</td>
              <td className="px-4 py-3 border-r border-gray-200">
                <span className="phone-link">
                  {tx.phoneNumber}
                  <span className="phone-icon">📞</span>
                </span>
              </td>
              <td className="px-4 py-3 text-gray-700 border-r border-gray-200">{tx.gender}</td>
              <td className="px-4 py-3 text-gray-700 border-r border-gray-200">{tx.age}</td>
              <td className="px-4 py-3 text-gray-700 border-r border-gray-200">{tx.productCategory}</td>
              <td className="px-4 py-3 text-gray-700 border-r border-gray-200">{tx.quantity}</td>
              <td className="px-4 py-3 text-gray-700 border-r border-gray-200">₹ {tx.totalAmount.toLocaleString('en-IN')}</td>
              <td className="px-4 py-3 text-gray-700 border-r border-gray-200">{tx.customerRegion}</td>
              <td className="px-4 py-3 text-gray-700 border-r border-gray-200">{tx.productId}</td>
              <td className="px-4 py-3 text-gray-700">{tx.employeeName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
