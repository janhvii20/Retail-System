export const StatsCards = ({ transactions }) => {
  const totalUnits = transactions.reduce((sum, tx) => sum + (tx.quantity || 0), 0);
  const totalAmount = transactions.reduce((sum, tx) => sum + (tx.totalAmount || 0), 0);
  const totalDiscount = transactions.reduce((sum, tx) => sum + ((tx.totalAmount || 0) - (tx.finalAmount || 0)), 0);

  return (
    <div className="bg-white px-8 py-4 border-b border-gray-200 flex gap-16">
      <div className="stat-card">
        <div className="stat-label">
          Total units sold
          <span className="stat-icon">?</span>
        </div>
        <div className="stat-value">{totalUnits}</div>
      </div>

      <div className="stat-card">
        <div className="stat-label">
          Total Amount
          <span className="stat-icon">?</span>
        </div>
        <div className="stat-value">₹{totalAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })} ({Math.round(totalAmount / 100)} SRs)</div>
      </div>

      <div className="stat-card">
        <div className="stat-label">
          Total Discount
          <span className="stat-icon">?</span>
        </div>
        <div className="stat-value">₹{totalDiscount.toLocaleString('en-IN', { maximumFractionDigits: 0 })} ({Math.round(totalDiscount / 100)} SRs)</div>
      </div>
    </div>
  );
};
