import { useState, useEffect } from "react";
import Home from "./pages/Home";
import "./styles/App.css";
import API from "./api";

function App() {
  const [user, setUser] = useState(null);

  const telegramId = "123456789"; // बाद में Telegram WebApp से आएगा

  const loadUser = async () => {
    try {
      const res = await API.get(`/mining/status/${telegramId}`);

      setUser({
        telegramId,
        incBalance: res.data.incBalance,
        dvlcBalance: res.data.dvlcBalance,
        incMining: res.data.incMining,
        dvlcMining: res.data.dvlcMining,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <Home
      user={user}
      refreshUser={loadUser}
    />
  );
}

export default App;
