import { useState, useEffect } from "react";
import API from "../api";

export default function MiningCard({
  telegramId,
  coin,
  mining,
  refreshUser,
}) {
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const reward =
    coin === "INC"
      ? (mining.doublePower ? 60 : 30)
      : (mining.doublePower ? 40 : 20);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!mining.active) {
        setTimeLeft(0);
        return;
      }

      const left = Math.max(
        0,
        Math.floor(
          (new Date(mining.endTime) - new Date()) / 1000
        )
      );

      setTimeLeft(left);
    }, 1000);

    return () => clearInterval(timer);
  }, [mining]);

  const formatTime = (sec) => {
    const h = String(Math.floor(sec / 3600)).padStart(2, "0");
    const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");

    return `${h}:${m}:${s}`;
  };
  const startMining = async (doublePower = false) => {
    try {
      setLoading(true);

      const res = await API.post("/mining/start", {
        telegramId,
        coin,
        doublePower,
      });

      if (res.data.success) {
  alert("🚀 Mining Started");
  refreshUser();
} else {
  alert(res.data.message);
}

    } catch (err) {
      alert("Mining Start Failed");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const claimReward = async () => {
    try {
      setLoading(true);

      const res = await API.post("/mining/claim", {
        telegramId,
        coin,
      });

      if (res.data.success) {
  alert("🎉 Reward Claimed Successfully");
  refreshUser();
} else {
  alert(res.data.message);
}

    } catch (err) {
      alert("Claim Failed");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const miningFinished =
    mining.active &&
    timeLeft === 0;
  return (
    <div className="mining-card">
      <h2>
        {coin === "INC" ? "⛏️" : "💎"} {coin} Mining
      </h2>

      <p className="reward-text">
        Reward: <b>{reward} {coin}</b>
      </p>

      <div className="timer-box">
        <h1>
          {mining.active
            ? formatTime(timeLeft)
            : (coin === "INC" ? "03:00:00" : "02:00:00")}
        </h1>
      </div>

      {mining?.doublePower && (
        <p className="active-power">
          🚀 2X Power Active
        </p>
      )}

      {!mining.active && (
        <>
          <button
            className="power-btn"
            disabled={loading}
            onClick={() => startMining(true)}
          >
            🚀 Activate 2X
          </button>

          <button
            className="start-btn"
            disabled={loading}
            onClick={() => startMining(false)}
          >
            ⛏️ Start Mining
          </button>
        </>
      )}

      {mining.active && !miningFinished && (
        <button
          className="mining-btn"
          disabled
        >
          ⛏️ Mining Running...
        </button>
      )}

      {miningFinished && (
        <button
          className="claim-btn"
          disabled={loading}
          onClick={claimReward}
        >
          💰 Claim Reward
          </button>
      )}
    </div>
  );
}
