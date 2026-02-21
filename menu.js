import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

async function showMenu() {
  const rl = readline.createInterface({ input, output });
  let running = true;

  while (running) {
    console.log('\n==================================');
    console.log('🚀 STACKS HACKER TOOLKIT v3.0 🚀');
    console.log('==================================');
    console.log('1. Ping Mainnet (Block Height)');
    console.log('2. Check STX Balance');
    console.log('3. Scan Transaction History');
    console.log('4. Scan NFT Holdings');
    console.log('5. Scan Custom Coins (SIP-010)');
    console.log('6. Exit');
    console.log('==================================');

    const choice = await rl.question('👉 Select an option (1-6): ');

    if (choice === '1') {
      console.log('\n📡 Pinging...');
      const response = await fetch('https://api.mainnet.hiro.so/v2/info');
      const data = await response.json();
      console.log('🚀 Current Block Height:', data.stacks_tip_height);
    } else if (choice === '2') {
      const address = await rl.question('\n👉 Enter a Stacks wallet address: ');
      const response = await fetch(`https://api.mainnet.hiro.so/extended/v1/address/${address}/balances`);
      const data = await response.json();
      const stxBalance = parseInt(data.stx.balance) / 1000000;
      console.log(`\n🪙  STX Balance: ${stxBalance} STX`);
    } else if (choice === '3') {
      const address = await rl.question('\n👉 Enter a Stacks wallet address: ');
      const response = await fetch(`https://api.mainnet.hiro.so/extended/v1/address/${address}/transactions?limit=5`);
      const data = await response.json();
      console.log('\n📜 Recent Transactions:');
      data.results.forEach((tx, i) => console.log(`[${i + 1}] TxID: ${tx.tx_id} | Status: ${tx.tx_status}`));
    } else if (choice === '4') {
      const address = await rl.question('\n👉 Enter a Stacks wallet address: ');
      const response = await fetch(`https://api.mainnet.hiro.so/extended/v1/tokens/nft/holdings?principal=${address}`);
      const data = await response.json();
      console.log('\n🎨 NFT Collection:');
      if (data.results && data.results.length > 0) {
        data.results.forEach((nft, i) => console.log(`[${i + 1}] Asset: ${nft.asset_identifier}`));
      } else {
        console.log('❌ No NFTs found.');
      }
    } else if (choice === '5') {
      const address = await rl.question('\n👉 Enter a Stacks wallet address: ');
      console.log(`\n💎 Fetching Custom Coins for: ${address}...`);
      const response = await fetch(`https://api.mainnet.hiro.so/extended/v1/address/${address}/balances`);
      const data = await response.json();
      const tokens = Object.keys(data.fungible_tokens || {});
      
      console.log('\n🪙 Custom Coin Portfolio:');
      if (tokens.length > 0) {
        tokens.forEach((token, index) => {
          const balance = data.fungible_tokens[token].balance;
          const tokenName = token.split('::')[1] || 'Unknown Token';
          console.log(`[${index + 1}] ${tokenName} -> Balance: ${balance}`);
        });
      } else {
        console.log('❌ No custom coins found in this wallet.');
      }
    } else if (choice === '6') {
      console.log('\n👋 Exiting toolkit. Stay safe out there!');
      running = false;
    } else {
      console.log('\n❌ Invalid choice, please try again.');
    }
  }
  rl.close();
}

showMenu();
