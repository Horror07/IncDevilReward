import React, { useState, useEffect } from "react";

export default function MiningCard({
  coin,
  reward,
  duration,
  icon,
  onClaim,
}) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [mining, setMining] = useState(false);
  const [claim, setClaim] = useState(false);
  const [doublePower, setDoublePower] = useState(false);

  useEffect(() => {
    if (!mining) return;

    const speed = doublePower ? 2 : 1;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= speed) {
          clearInterval(timer);
          setMining(false);
          setClaim(true);
          return 0;
        }
        return prev - speed;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [mining, doublePower]);

  const formatTime = (sec) => {
    const h = String(Math.floor(sec / 3600)).padStart(2, "0");
    const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");

    return `${h}:${m}:${s};`
  };

  const startMining = () => {
    alert("📺 Watch 1 Ad");
    setMining(true);
    setClaim(false);
  };

  const enable2x = () => {
    if (doublePower) {
      alert("✅ 2X Power Already Active");
      return;
    }

    alert("📺 Watch 2 Ads");
    setDoublePower(true);
  };

  const claimReward = () => {
    const finalReward = doublePower ? reward * 2 : reward;

    alert(`🎉 ${finalReward} ${coin} Claimed Successfully`);

    if (onClaim) {
      onClaim(coin, finalReward);
    }

    setTimeLeft(duration);
    setMining(false);
    setClaim(false);
    setDoublePower(false);
  };

  return (
    <div className="mining-card">
      <h2>
        {icon} {coin} Mining
      </h2>

      <p className="reward-text">
        Reward: <b>{doublePower ? reward * 2 : reward} {coin}</b>
      </p>

      <div className="timer-box">
        <h1>{formatTime(timeLeft)}</h1>
      </div>

      {doublePower && (
        <p className="active-power">
          🚀 2X Power Active
        </p>
      )}

      {!claim && (
        <button
          className="power-btn"
          onClick={enable2x}
          disabled={doublePower}
        >
          {doublePower
            ? "🚀 2X Activated"
            : "🚀 Activate 2X"}
        </button>
      )}

      {!mining && !claim && (
        <button
          className="start-btn"
          onClick={startMining}
        >
          ⛏️ Start Mining
        </button>
      )}

      {mining && (
        <button
          className="mining-btn"
          disabled
        >
          ⛏️ Mining Running...
        </button>
      )}

      {claim && (
        <button
          className="claim-btn"
          onClick={claimReward}
        >
          💰 Claim Reward
        </button>
      )}
    </div>
  );
}