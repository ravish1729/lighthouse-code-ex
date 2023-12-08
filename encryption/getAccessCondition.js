import lighthouse from '@lighthouse-web3/sdk'

const accessConditions = async() =>{
  const cid = "QmYnBnNR9stXXQLZRKk2wLLnqo9gx4R3RaQ4K4oBtvZkKX";
  const response = await lighthouse.getAccessConditions(cid);

  // Display response
  console.log(response);
}

accessConditions()
