import React from 'react'

const PageNumber = (props) => {
  return (
    <input id={props.page} name={props.page} className={`page-link ${props.pageNo === props.page ? "active-page-btn" : ""}`} type={'submit'} onClick={props.changePage} value={props.page}></input>
  )
}

export default PageNumber
