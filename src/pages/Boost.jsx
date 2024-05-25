// import logo from './logo.svg';
// import './App.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../assets/logo.png';
import telegram from '../assets/telegram.png'
import x from '../assets/x.png'
import { useNavigate } from 'react-router-dom';
import mine from '../assets/mine.png'
import arrow from '../assets/arrow_13742089.png'
// import boo from '../'
import styles from '../FireAnimation.module.css';
function Boost() {
  const navigate = useNavigate();

    const handleNavigation = () => {
        navigate('/');
    };
    const [supply, setSupply] = useState({totalTokens:0});
const address = localStorage.getItem('address');
    useEffect(() => {
      
      axios.get('https://bonelasher-slicer.toystack.dev/supply')
        .then(res => {
          console.log(res.data);
          setSupply(res.data);
        })
        .catch(err => {
          console.error("Error fetching user data!", err);
        });
    }, []);
  return (
    <>
     <img style={{width:"30px",marginLeft:"5px"}} onClick={handleNavigation} src={arrow}>
   </img>
    <center>
    <img style={{width:"180px"}} src={logo}></img>
    <div style={{fontSize:"30px",fontWeight:"bold",fontFamily:"sans-serif",marginBottom:'20px'}}>Total Mined tokens till now</div>
    <div style={{fontSize:"30px",fontWeight:"bold",fontFamily:"sans-serif",marginBottom:'20px',marginBottom:"40px"}}>{supply.totalTokens.toFixed(4)}</div>
    </center>
    
    <div className={styles.fire}>
      <div className={styles.flames}>
        <div className={styles.flame}></div>
        <div className={styles.flame}></div>
        <div className={styles.flame}></div>
        <div className={styles.flame}></div>
      </div>
      <div className={styles.logs}></div>

    </div>
    </>
  );
}

export default Boost;