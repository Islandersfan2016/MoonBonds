const axios = require('axios');

const url = `https://scroll-sepolia.g.alchemy.com/v2/oQ5jbanceS_RNgPSqHSrKdimLWPwH14h`;

const payload = {
  jsonrpc: '2.0',
  id: 1,
  method: 'eth_blockNumber',
  params: []
};

axios.post(url, payload)
  .then(response => {
    console.log('Block Number:', response.data.result);
  })
  .catch(error => {
    console.error(error);
  });
