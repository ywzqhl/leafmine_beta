import React, { useState, useEffect } from 'react';
import {THEME, TonConnectUIProvider} from "@tonconnect/ui-react";
import logo from "./assets/logo.png";
import tree from './assets/tree.png';
import boost from './assets/boost.png'
import refer from './assets/ecologist.png'
import mission from './assets/target.png'
import walle from './assets/wallet.png'
import leaf from './assets/leaf.png';
import  Header  from './pages/Header';
import Walle from './pages/Walle';
// import mine from './mine.png'
import mine from './assets/mine.png'
import { Outlet, Link } from "react-router-dom";

import axios from 'axios';



const App = () => {
  const [balance, setBalance] = useState(parseFloat(localStorage.getItem('balance')) || 0);
  const [user, setUser] = useState({ tokens: 0 });
  const [total, setTotal] = useState(0);
  const [userId, setUserId] = useState(872108881);
  const address = localStorage.getItem('address');
  
  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const initData = window.Telegram.WebApp.initDataUnsafe;
      const userIdFromTelegram = initData.user && initData.user.id;

      if (userIdFromTelegram) {
        localStorage.setItem('username', userIdFromTelegram);
        setUserId(userIdFromTelegram);
      }
    } else {
      const params = new URLSearchParams(window.location.search);
      const userIdFromUrl = params.get('userId');
      if (userIdFromUrl) {
        setUserId(userIdFromUrl);
      }
    }
  }, []);

  useEffect(() => {
    const lastUpdate = localStorage.getItem('lastUpdate');
    const to = localStorage.getItem('wal');
    setTotal(to);
    const currentBalance = parseFloat(localStorage.getItem('balance')) || 0;
    const currentTime = Date.now();

    if (lastUpdate) {
      const elapsedSeconds = Math.floor((currentTime - parseInt(lastUpdate, 10)) / 1000);
      const newBalance = currentBalance + elapsedSeconds * 0.00002;
      setBalance(newBalance);
      localStorage.setItem('balance', newBalance);
    } else {
      setBalance(currentBalance);
    }

    const interval = setInterval(() => {
      setBalance(prevBalance => {
        const newBalance = prevBalance + 0.00002;
        localStorage.setItem('balance', newBalance);
        localStorage.setItem('lastUpdate', Date.now());
        return newBalance;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    axios.post('https://bonelasher-slicer.toystack.dev/user', {
      username: address
    })
      .then(res => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch(err => {
        console.error("Error fetching user data!", err);
      });
  }, [user]);

  const handleClaim = async () => {
    setBalance(0);

    try {
      const address = localStorage.getItem('address');
      const res = await axios.post('https://bonelasher-slicer.toystack.dev/claim', {
        username: address,
        tokens: balance
      });
      console.log(res);
    } catch (err) {
      console.error("Error claiming tokens!", err);
    }
  };

  return (
    <>
      <TonConnectUIProvider
        manifestUrl="https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json"
        uiPreferences={{ theme: THEME.DARK }}
        walletsListConfiguration={{
          includeWallets: [
            {
              appName: "safepal",
              name: "SafePal",
              imageUrl: "https://s.pvcliping.com/web/public_image/SafePal_x288.png",
              aboutUrl: "https://www.safepal.com/download",
              jsBridgeKey: "safepalwallet",
              platforms: ["ios", "android", "chrome", "firefox"]
            },
            {
              appName: "tonwallet",
              name: "TON Wallet",
              imageUrl: "https://wallet.ton.org/assets/ui/qr-logo.png",
              aboutUrl: "https://chrome.google.com/webstore/detail/ton-wallet/nphplpgoakhhjchkkhmiggakijnkhfnd",
              universalLink: "https://wallet.ton.org/ton-connect",
              jsBridgeKey: "tonwallet",
              bridgeUrl: "https://bridge.tonapi.io/bridge",
              platforms: ["chrome", "android"]
            }
          ]
        }}
        actionsConfiguration={{
          twaReturnUrl: 'https://t.me/DemoDappWithTonConnectBot/demo'
        }}
      >
        <div className="app">
          <Header />
          <Walle />
        </div>
      </TonConnectUIProvider>

      <div className='storage'>In Storage :</div>
      <div className='head'>
        <img className='logo' src={logo} alt="logo" />
        <div className='balance'>{balance.toFixed(5)}</div>
      </div>
      <div className='tree'>
        <img src={tree} alt="tree" />
      </div>
      <div className='bag'>
        <img src={leaf} alt="leaf" />
        <div>
          <div style={{ fontSize: "20px", fontWeight: "bold" }}>Storage</div>
          <div>24 hr to fill</div>
          <div>0.00002 LEAF/Sec</div>
        </div>
        <button onClick={handleClaim} id='claim'>Mine</button>
      </div>

      <div className='btm'>
        <Link to='/social'>
          <div className='btmm'>
            <img id='boost' src={mission}></img>
            <div>Missions</div>
          </div>
        </Link>
        <Link to='/boost'>
        <div className='btmm'>
          <img id='boost' src={mine}></img>
          <div>Mined</div>
        </div>
        </Link>
        <div className='btmm'>
          <img id='boost' src={refer}></img>
          <div>Refer</div>
        </div>
        <Link to='/amount'>
          <div className='btmm'>
            <img id='boost' src={walle}></img>
            <div>Wallet</div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default App;
