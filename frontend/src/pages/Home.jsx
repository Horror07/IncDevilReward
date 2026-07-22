import Header from "../components/Header";
import BalanceCard from "../components/BalanceCard";
import MiningCard from "../components/MiningCard";
import BottomNav from "../components/BottomNav";

function Home({ user, refreshUser }) {
  return (
    <div className="home">
      <Header />

      <BalanceCard
        incBalance={user.incBalance}
        dvlcBalance={user.dvlcBalance}
      />

      <MiningCard
        telegramId={user.telegramId}
        coin="INC"
        mining={user.incMining}
        refreshUser={refreshUser}
      />

      <MiningCard
        telegramId={user.telegramId}
        coin="DVLC"
        mining={user.dvlcMining}
        refreshUser={refreshUser}
      />

      <BottomNav />
    </div>
  );
}

export default Home;
