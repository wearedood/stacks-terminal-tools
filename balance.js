const readline = require('node:readline/promises');
const { stdin: input, stdout: output } = require('node:process');

async function checkBalance() {
  const rl = readline.createInterface({ input, output });
  
  // Pause the terminal and wait for the user to type an address
  const address = await rl.question('\n👉 Enter a Stacks wallet address: ');
  
  console.log(`\n🔍 Scanning wallet: ${address}...`);
  const response = await fetch(`https://api.mainnet.hiro.so/extended/v1/address/${address}/balances`);
  const data = await response.json();
  
  const stxBalance = parseInt(data.stx.balance) / 1000000;
  console.log(`🪙  STX Balance: ${stxBalance} STX\n`);
  
  // Close the input stream so the script can finish
  rl.close();
}

checkBalance();
