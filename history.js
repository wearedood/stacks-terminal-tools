import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

async function checkTransactions() {
  const rl = readline.createInterface({ input, output });

  const address = await rl.question('\n👉 Enter a Stacks wallet address: ');

  console.log(`\n🕵️‍♂️ Fetching last 5 transactions for: ${address}...`);
  const response = await fetch(`https://api.mainnet.hiro.so/extended/v1/address/${address}/transactions?limit=5`);
  const data = await response.json();

  console.log('\n📜 Recent Transactions:');
  data.results.forEach((tx, index) => {
    console.log(`[${index + 1}] TxID: ${tx.tx_id}`);
    console.log(`    Type: ${tx.tx_type} | Status: ${tx.tx_status}`);
  });
  console.log('\n');

  rl.close();
}

checkTransactions();
