import Header from "../components/Header";
import BalanceCard from "../components/BalanceCard";
import MiningCard from "../components/MiningCard";
import BottomNav from "../components/BottomNav";

function Home({
  incBalance,
  dvlcBalance,
  onClaim,
}) {
  return (
    <div className="home">
      <Header />

      <BalanceCard
        incBalance={incBalance}
        dvlcBalance={dvlcBalance}
      />

      <MiningCard
        coin="INC"
        reward={30}
        duration={10800}
        icon="⛏️"
        onClaim={onClaim}
      />

      <MiningCard
        coin="DVLC"
        reward={20}
        duration={7200}
        icon="💎"
        onClaim={onClaim}
      />

      <BottomNav />
    </div>
  );
}

export default Home;