async function checkBalance(address) {
  console.log(`🔍 Scanning wallet: ${address}...`);
  const response = await fetch(`https://api.mainnet.hiro.so/extended/v1/address/${address}/balances`);
  const data = await response.json();
  
  const stxBalance = parseInt(data.stx.balance) / 1000000;
  console.log(`🪙  STX Balance: ${stxBalance} STX`);
}

// Testing with the official Stacks burn address
checkBalance('SP000000000000000000002Q6VF78');
