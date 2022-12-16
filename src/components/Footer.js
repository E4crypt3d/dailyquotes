import React from 'react'
import DTComp from '../components/DateTime'
import { FaGithubSquare } from 'react-icons/fa';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'

TimeAgo.addDefaultLocale(en)
function Footer() {
  const date = new Date()
  return (
    <footer className='footer'>
      <a href='https://github.com/E4crypt3d' target={'_blank'} rel='noreferrer'>
        <p className='footer-web'><FaGithubSquare size={20} className='footer-logo' /> @E4cryp3d
          <span className='year'> @{date.getFullYear()}</span>
          <DTComp />
        </p>
      </a>
    </footer>
  )
}

export default Footer
