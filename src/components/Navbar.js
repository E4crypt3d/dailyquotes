import React from 'react'
import AddQuote from '../components/Modal'
import { FaGithubSquare } from 'react-icons/fa';
function Navbar(props) {
  return (
    <nav className='navbar'>
      <a className='web-title' href='/'>Daily Quotes</a>
      <AddQuote setQuotes={props.setQuotes} setTotalQuotes={props.setTotalQuotes} />
      <a className='nav-link' href='https://github.com/E4crypt3d' target={'_blank'} rel='noreferrer'>
        <FaGithubSquare size={30} /></a>

    </nav>
  )
}

export default Navbar
