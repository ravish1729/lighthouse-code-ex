const axios = require('axios')

const proof = async() =>{
  const cid = "QmNvjxaqpRiX7o2U5MQA8DZcz7T1dctjan3ZPH2sF5Hy9i";
  const response = await axios.get(
    `https://api.lighthouse.storage/api/lighthouse/get_proof?network=testnet&cid=${cid}`
  );

  // Display response
  console.log(response.data);
}

proof()
