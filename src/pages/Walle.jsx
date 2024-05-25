// import { useTonWallet } from '@tonconnect/ui-react';
import {useTonConnectUI, useTonWallet} from "@tonconnect/ui-react";
import { useTonAddress } from '@tonconnect/ui-react';
// import {TonConnectButton} from "@tonconnect/ui-react";
 const Walle = () => {
    // const wallet = useTonWallet();
    const userFriendlyAddress = useTonAddress();
    const rawAddress = useTonAddress(false);
    // const [tonConnectUI] = useTonConnectUI();
    localStorage.setItem('address',userFriendlyAddress)

    return (

        userFriendlyAddress && (
            <div>
                {/* <span>User-friendly address: {userFriendlyAddress}</span> */}
                {/* <span>Raw address: {rawAddress}</span> */}
            </div>
        )
    );
};
export default Walle;