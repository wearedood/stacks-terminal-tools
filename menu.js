import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

async function showMenu() {
  const rl = readline.createInterface({ input, output });
  let running = true;

  while (running) {
    console.log('\n==================================');
    console.log('🚀 STACKS HACKER TOOLKIT v1.0 🚀');
    console.log('==================================');
    console.log('1. Ping Mainnet (Block Height)');
    console.log('2. Check STX Balance');
    console.log('3. Scan Transaction History');
    console.log('4. Exit');
    console.log('==================================');

    const choice = await rl.question('👉 Select an option (1-4): ');

    if (choice === '1') {
      console.log('\n📡 Pinging Stacks Mainnet...');
      const response = await fetch('https://api.mainnet.hiro.so/v2/info');
      const data = await response.json();
      console.log('🚀 Current Block Height:', data.stacks_tip_height);
    } else if (choice === '2') {
      const address = await rl.question('\n👉 Enter a Stacks wallet address: ');
      console.log(`\n🔍 Scanning wallet: ${address}...`);
      const response = await fetch(`https://api.mainnet.hiro.so/extended/v1/address/${address}/balances`);
      const data = await response.json();
      const stxBalance = parseInt(data.stx.balance) / 1000000;
      console.log(`🪙  STX Balance: ${stxBalance} STX`);
    } else if (choice === '3') {
      const address = await rl.question('\n👉 Enter a Stacks wallet address: ');
      console.log(`\n🕵️‍♂️ Fetching last 5 transactions for: ${address}...`);
      const response = await fetch(`https://api.mainnet.hiro.so/extended/v1/address/${address}/transactions?limit=5`);
      const data = await response.json();
      console.log('\n📜 Recent Transactions:');
      data.results.forEach((tx, index) => {
        console.log(`[${index + 1}] TxID: ${tx.tx_id}`);
        console.log(`    Type: ${tx.tx_type} | Status: ${tx.tx_status}`);
      });
    } else if (choice === '4') {
      console.log('\n👋 Exiting toolkit. Stay safe out there!');
      running = false;
    } else {
      console.log('\n❌ Invalid choice, please try again.');
    }
  }
  rl.close();
}

showMenu();
