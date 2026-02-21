async function getLatestBlock() {
  console.log("📡 Pinging Stacks Mainnet...");
  const response = await fetch('https://api.mainnet.hiro.so/v2/info');
  const data = await response.json();
  console.log('🚀 Current Stacks Block Height:', data.stacks_tip_height);
}

getLatestBlock();
