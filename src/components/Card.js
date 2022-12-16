import React from 'react'

import ReactTimeAgo from 'react-time-ago'



const Card = (quote) => {
  const date = new Date(quote.quote.added_on);

  return (
    <>
      <div className='card'>
        <h3 className='card-title'>{quote.quote.author} <span className='timeago'>(<ReactTimeAgo date={date} locale="en-US" />)</span> </h3>
        <span className='card-category'>Category : {quote.quote.category}</span>
        <p className='card-quote'>{quote.quote.quote}</p>
      </div>
    </>
  )
}

export default Card
