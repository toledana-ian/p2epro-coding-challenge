import Web3 from "web3";
// @ts-ignore
import katanaAbi from "../abi/katana.json"

const env = {
    PRIVATE_KEY: process.env.PRIVATE_KEY ?? '',
    WALLET_ADDRESS: process.env.WALLET_ADDRESS ?? '',
    RONIN_PROVIDER: process.env.RONIN_PROVIDER ?? 'https://api.roninchain.com/rpc'
}

const WRON = "0xe514d9deb7966c8be0ca922de8a064264ea6bcd4";
const WETH = "0xc99a6a985ed2cac1ef41640596c5a5f9f4e19ef5";
const SLP = "0xa8754b9fa15fc18bb59458815510e40a12cd2014";
const KATANA_ADDRESS = "0x7d0556d55ca1a92708681e2e231733ebd922597d";

const w3 = new Web3(env.RONIN_PROVIDER);

export const getWalletAddress = () => {
    return env.WALLET_ADDRESS.split(':')[1];
}

export const getRonBalance = async () => {
    const balance = w3.eth.getBalance(
        getWalletAddress()
    );

    return w3.utils.fromWei(await balance, 'ether');
}

export const convertRonToSlp = async (amount: number) => {
    w3.eth.accounts.wallet.add({
        privateKey: env.PRIVATE_KEY,
        address: Web3.utils.toChecksumAddress(getWalletAddress())
    })

    const katanaContract = new w3.eth.Contract(
        katanaAbi,
        KATANA_ADDRESS
    );

    const path = [WRON, WETH, SLP];

    let amountToSlp = await katanaContract.methods.getAmountsOut(
        Web3.utils.toWei(amount + '', 'ether'),
        path
    ).call();
    amountToSlp = Math.floor(amountToSlp[2]);

    let  amountOutMin = Math.floor(amountToSlp*.99)+'';
    amountOutMin = Web3.utils.fromWei(amountOutMin, 'ether');

    try {
        const swap = await katanaContract.methods.swapExactRONForTokens(
            Web3.utils.toWei(amountOutMin, 'ether'),
            path,
            Web3.utils.toChecksumAddress(getWalletAddress()),
            Math.floor(Date.now()*.001) + 1800,
        ).send({
            from: Web3.utils.toChecksumAddress(getWalletAddress()),
            gas:400000
        })
        console.log('=========SUCCESS=========');
        console.log(swap);
        return swap;
    } catch (error) {
        console.log('=========ERROR=========');
        console.log(error);
        return error;
    }
}