# Token Transaction with Memo

This project is designed to teach how to send additional data (MEMO) along with a USDT (Tether) token transaction on the Polygon network. The additional data can include various types of information such as a key, and an optional message.

## Overview

The script utilizes the `ethers.js` library to interact with the Polygon blockchain and the USDT token contract. It also uses `axios` to fetch the current gas price and `dotenv` to manage environment variables. The goal is to send a transaction with additional data encoded in the transaction's input data field.

## Features

- **Send USDT Transactions**: Execute token transfers with additional memo data.
- **Custom Memo Data**: Include key, and an optional message.
- **Dynamic Gas Price Calculation**: Fetches current gas prices and adjusts for faster transaction speeds.

## Requirements

- Node.js
- `ethers.js`
- `axios`
- `dotenv`
- `abi-decoder`

## Setup

1. **Clone the Repository**

    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Configure Environment Variables**

    Create a `.env` file in the project root and add the following environment variables:

    ```dotenv
    NODE_URL=<your-json-rpc-provider-url>
    W_KEY=<your-wallet-private-key>
    SCAN_API_KEY=<your-polygonscan-api-key>
    ```

    We use a default public RPC : https://polygon-rpc.com
    You can get a free polygonscan key in https://polygonscan.com

4. **Prepare ABI File**

    Ensure the `Usdt.json` ABI file is available in the project root directory. This file contains the ABI of the USDT token contract.

## Usage

Edit the `messageObjectOffRamp` and `amount` variables in the script to specify the memo data and transaction amount:

    ```javascript
        const messageObjectOffRamp = {
            key: "<your--key>",
            msg: "<optional-message>"
        };

        const amount = "<transaction-amount-in-ether>";

        const messageJSON = JSON.stringify(messageObjectOffRamp);

        getMemoAndSendTransactions(messageJSON, amount, recipientEngine);
    ```


## Memo Data Format

- **Key**: A random key provided by the bank. Example: `6602ede6-b1a9-4e63-9178-c6883fd0095e`
 **Phone Number**: International format with country code, city code, and 9 digits. Example: `+5548996005588`
 **CPF**: 11 digits without spaces or special characters. Example: `80042387413`
 **CNPJ**: 14 digits without spaces or special characters. Example: `59456277000176`
 **Email**: Example: `john@gmail.com`
- **MSG (Optional)**: Any string to label your transaction. Example: `XYZGames`

## Notes

- The  key should be sent as a string, preferable a random key to protect privacy.
- The optional MSG parameter can be used to add a label to your transaction for easier monitoring on the blockchain.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [ethers.js](https://docs.ethers.io/)
- [Polygonscan](https://polygonscan.com/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [axios](https://axios-http.com/)
- [abi-decoder](https://www.npmjs.com/package/abi-decoder)
