import { useState } from "react";
import Home from "./pages/Home";
import "./styles/app.css";

function App() {
  const [incBalance, setIncBalance] = useState(0);
  const [dvlcBalance, setDvlcBalance] = useState(0);

  const handleClaim = (coin, amount) => {
    if (coin === "INC") {
      setIncBalance((prev) => prev + amount);
    } else if (coin === "DVLC") {
      setDvlcBalance((prev) => prev + amount);
    }
  };

  return (
    <Home
      incBalance={incBalance}
      dvlcBalance={dvlcBalance}
      onClaim={handleClaim}
    />
  );
}

export default App;