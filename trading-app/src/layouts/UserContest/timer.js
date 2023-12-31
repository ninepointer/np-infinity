import React, { useState, useEffect, memo, useRef } from "react";
import { useNavigate } from "react-router-dom";

const CountdownTimer = ({ targetDate,text, contestId, portfolioId, isDummy, contestName, redirect, minEntry, entry, contest }) => {
  //console.log(targetDate,text, contestId, portfolioId, isDummy, contestName, redirect)
  let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000/"
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());
  const navigate = useNavigate();
  const flag = useRef(true);


  useEffect(() => {
    setTimeout(()=>{
      flag.current = true;
    }, 10000)
    
    const timerId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [targetDate]);

  function calculateTimeRemaining() {
    const timeDiff = Date.parse(targetDate) - Date.parse(new Date());
    const seconds = Math.floor((timeDiff / 1000) % 60);
    const minutes = Math.floor((timeDiff / 1000 / 60) % 60);
    const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return {
      total: timeDiff,
      days,
      hours,
      minutes,
      seconds,
    };
  }


  const { days, hours, minutes, seconds } = timeRemaining

  console.log(timeRemaining.total <= 0 , !isDummy , flag.current , redirect, entry , minEntry)

  if(timeRemaining.total <= 0 && !isDummy && flag.current && redirect){
    console.log("timer running 2nd")
    navigate(`/battlestreet/result`, {
      state: {contestId: contestId, portfolioId: portfolioId, contest: contest}
    });
  } else if(timeRemaining.total <= 0 && isDummy && redirect){
    flag.current = (false)
    //console.log("timer running 1st")
    navigate(`/battlestreet/${contestName}`, {
      state: {contestId: contestId, portfolioId: portfolioId, isDummy: false, redirect: true}
    });
  }


  if (timeRemaining.total <= 0 && text !== "Battle Ends") {
    return <div style={{fontSize:9}}>{text}</div>
  }

  //console.log("time difference", timeRemaining.total)



  return (
    <div style={{fontSize:9}}>
      {days >= 0 &&
      `${days} days, ${hours} hrs, ${minutes} mins, ${seconds} seconds left` 
      }
    </div>
  );
};

export default memo(CountdownTimer);
