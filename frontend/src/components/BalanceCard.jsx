function BalanceCard({ incBalance, dvlcBalance }) {
  return (
    <div className="balance-card">
      <div className="coin-box">
        <h2>🪙 INC</h2>
        <h1>{incBalance}</h1>
      </div>

      <div className="coin-box">
        <h2>💎 DVLC</h2>
        <h1>{dvlcBalance}</h1>
      </div>
    </div>
  );
}

export default BalanceCard;