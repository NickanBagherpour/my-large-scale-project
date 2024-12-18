'use client';

import React from 'react';
import { useState, useEffect } from 'react';

export type TimerProps = {
  initialSeconds: number;
  onCountDown?: (remainingSeconds: number) => void;
  onComplete?: () => void;
};

export const Timer = (props: TimerProps) => {
  const { initialSeconds = 0, onCountDown, onComplete } = props;

  const [remainingTime, setRemainingTime] = useState(initialSeconds);

  useEffect(() => {
    if (remainingTime <= 0) return; // Stop if time is up

    const myInterval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(myInterval);
          if (onComplete) onComplete();
          return 0; // Ensure it does not go negative
        }
        return prev - 1; // Decrement remaining time
      });
    }, 1000);

    return () => clearInterval(myInterval); // Cleanup interval on unmount
  }, [remainingTime, onComplete]);

  useEffect(() => {
    if (onCountDown) {
      onCountDown(remainingTime);
    }
  }, [remainingTime, onCountDown]);

  function getTime() {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  }

  return <>{remainingTime > 0 ? <span>{getTime()}</span> : null}</>;
};
