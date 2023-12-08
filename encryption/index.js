// Deploy file
import {ethers} from "ethers"
import lighthouse from '@lighthouse-web3/sdk'
import kavach from "@lighthouse-web3/kavach"
import * as dotenv from 'dotenv'
dotenv.config()

const signAuthMessage = async(privateKey) =>{
  const signer = new ethers.Wallet(privateKey)
  const authMessage = await kavach.getAuthMessage(signer.address)
  const signedMessage = await signer.signMessage(authMessage.message)
  const { JWT, error } = await kavach.getJWT(signer.address, signedMessage)
  return(JWT)
}

const uploadEncrypted = async() =>{
  const pathToFile = "C:/Users/ravis/Desktop/eth india/encryption/itachi.jpg"	//Give absolute path
  const apiKey = process.env.API_KEY
  const publicKey = "0xA3C960B3BA29367ecBCAf1430452C6cd7516F588"
  const privateKey = process.env.PRIVATE_KEY
  const JWT = await signAuthMessage(privateKey)
  
  const response = await lighthouse.uploadEncrypted(pathToFile, apiKey, publicKey, JWT)
  console.log(response)
  /* Sample Response
  {
    data: [
      {
        Name: 'itachi.jpg',
        Hash: 'QmYnBnNR9stXXQLZRKk2wLLnqo9gx4R3RaQ4K4oBtvZkKX',
        Size: '95121'
      }
    ]
  }
  */
}

uploadEncrypted()
