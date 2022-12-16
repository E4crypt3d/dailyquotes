import React, { useState, useEffect } from 'react'

function DateTime() {
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <span className='time'> {time.toLocaleTimeString()}</span>
  )
}

export default DateTime
