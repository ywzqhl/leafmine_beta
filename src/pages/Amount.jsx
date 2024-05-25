
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom';
import arrow from '../assets/arrow_13742089.png'
function Amount() {
  const navigate = useNavigate();

    const handleNavigation = () => {
        navigate('/');
    };
  
const [amount, setAmount] = useState({tokens:0});
const address = localStorage.getItem('address');
  useEffect(() => {
    axios.post('https://bonelasher-slicer.toystack.dev/user', {
      username: address
    })
      .then(res => {
        console.log(res.data);
        setAmount(res.data);
      })
      .catch(err => {
        console.error("Error fetching user data!", err);
      });
  }, []);
  return (

   <> 
  
   <img style={{width:"30px",marginLeft:"5px"}} onClick={handleNavigation} src={arrow}>
   </img>
   <div className='a'>
   Total Leaf Tokens
 </div>
 
<div className="amount">
 
 <img src={logo}></img>
 <div>{amount.tokens.toFixed(5)}</div>

</div>

{/* <div className='deposit'>
<button>
    Deposit
</button>
<button>
     Withdraw
</button>
</div> */}





   </>
  );
}

export default Amount;
