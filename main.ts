import { ethers } from 'ethers';
import * as dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';
const abiDecoder = require('abi-decoder');

const recipientEngine = "0x249C8F4779f276399D3ed8Fb2dFB619cd9FC7FCB";
const USDT_TOKEN_CONTRACT_ADDRESS = '0xc2132D05D31c914a87C6611C10748AEb04B58e8F';
const ERC20_ABIJSON = require('./Usdt.json');

// Set the ABI for decoding transaction data
abiDecoder.addABI(ERC20_ABIJSON.abi);

async function getMemoAndSendTransactions(message: string, amountInEther: string, recipient: string) {

    try {

        const provider = new ethers.providers.JsonRpcProvider(process.env.NODE_URL);
        const pk = process.env.W_KEY ? process.env.W_KEY : "";
        // Wallet with private key
        const wallet = new ethers.Wallet(pk, provider);
        const usdtContractChecker = new ethers.Contract(USDT_TOKEN_CONTRACT_ADDRESS, ERC20_ABIJSON.abi, wallet);


        // Encode the memo data
        const messageJSON = JSON.stringify(message);

        const dataField = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(messageJSON));

        const amount = ethers.utils.parseUnits(String(amountInEther), Number(6));

        let iface = new ethers.utils.Interface(ERC20_ABIJSON.abi);

        const data =
            iface.encodeFunctionData('transfer', [
                recipient,
                amount
            ]) + dataField.replace('0x', '');

        const gasPrices = await axios.get(
            `https://api.polygonscan.com/api?module=gastracker&action=gasoracle&apikey=${process.env.SCAN_API_KEY}`,
        );

        let fastGasPrice = parseFloat(gasPrices.data.result.FastGasPrice)
        fastGasPrice *= 1.15;
        let gasPrice = fastGasPrice.toFixed(1);

        const nonce = await provider.getTransactionCount(wallet.address, 'latest');

        // Craft transaction
        const tx = {
            to: USDT_TOKEN_CONTRACT_ADDRESS,
            value: 0,
            gasLimit: ethers.utils.hexlify(600000),
            gasPrice: ethers.utils.parseUnits(gasPrice, 'gwei'),
            nonce,
            data: data,
        };


        const send = await wallet.sendTransaction(tx);
        await send.wait();

        console.log('Transaction sent. Hash:', send.hash);

        //   }


    } catch (error: any) {
        console.error('Error 2:', error.message);
    }
}

// Get from form and send:

const messageObjectOffRamp = {
    key: "",  // <--- key field
    msg: "" // <--- MSG Field
}

const amount = ""; // <-- Amount

const messageJSON = JSON.stringify(messageObjectOffRamp);


getMemoAndSendTransactions(messageJSON, amount, recipientEngine);