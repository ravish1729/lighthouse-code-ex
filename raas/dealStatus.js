const axios = require('axios')

const dealStatus = async() =>{
  // Not registered deal
  const cid = "QmYnBnNR9stXXQLZRKk2wLLnqo9gx4R3RaQ4K4oBtvZkKX"
  // with deal
  // const cid = "QmNvjxaqpRiX7o2U5MQA8DZcz7T1dctjan3ZPH2sF5Hy9i";
  const response = await axios.get(
    `https://calibration.lighthouse.storage/api/deal_status?cid=${cid}`
  );

  // Display response
  console.log(response.data);
}

dealStatus()
