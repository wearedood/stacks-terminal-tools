import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

async function checkBalance() {
  const rl = readline.createInterface({ input, output });
  
  const address = await rl.question('\n👉 Enter a Stacks wallet address: ');
  
  console.log(`\n🔍 Scanning wallet: ${address}...`);
  const response = await fetch(`https://api.mainnet.hiro.so/extended/v1/address/${address}/balances`); 
  const data = await response.json();

  const stxBalance = parseInt(data.stx.balance) / 1000000;
  console.log(`🪙  STX Balance: ${stxBalance} STX\n`);

  rl.close();
}

checkBalance();
