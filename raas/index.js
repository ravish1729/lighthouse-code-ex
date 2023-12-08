require("dotenv").config()
const { ethers } = require("ethers")
const dealStatusAbi = require("./abi/dealStatusAbi")

const submitRAAS = async () => {
  // Signer
  const provider = new ethers.JsonRpcProvider("https://api.calibration.node.glif.io/rpc/v1")
  const privateKey = process.env.PRIVATE_KEY
  const signer = new ethers.Wallet(privateKey, provider)

  // Contract
  const contractAddress = "0x01ccBC72B2f0Ac91B79Ff7D2280d79e25f745960"
  const contract = new ethers.Contract(contractAddress, dealStatusAbi, signer)

  // Call submit
  const cid = "QmNvjxaqpRiX7o2U5MQA8DZcz7T1dctjan3ZPH2sF5Hy9i"
  const cidHex = ethers.hexlify(ethers.toUtf8Bytes(cid))
  // suppose endEpoch = 1678094, startEpoch = 1159694
  // end-start = 518400
  // 1 day approx 2880 epoch
  // to renew 10 days before expiring date use 28800 as epoch
  const submit = await contract.submitRaaS(cidHex, 2, 2880, 2880, {
    gasLimit: 500_000_000,
  })

  const response = await submit.wait()
  console.log(response)
};

submitRAAS()
