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

const accessControl = async() =>{
  try{
    const cid = "QmYnBnNR9stXXQLZRKk2wLLnqo9gx4R3RaQ4K4oBtvZkKX"
    const publicKey = "0xA3C960B3BA29367ecBCAf1430452C6cd7516F588"
    const privateKey = process.env.PRIVATE_KEY
    const JWT = await signAuthMessage(privateKey)
    
    // Conditions to add
    const conditions = [
      {
        id: 1,
        chain: "Calibration",
        method: "getBlockNumber",
        standardContractType: "",
        returnValueTest: {
            comparator: ">",
                value: "1256385"
         },
      }
    ]

    const aggregator = "([1])"

    const response = await lighthouse.applyAccessCondition(
      publicKey,
      cid,
      JWT,
      conditions,
      aggregator
    );

    // // Display response
    console.log(response)
    /*
      {
        data: {
          cid: 'Qmb4N3vFvkTPTvsDTMy1HRtCga4aiMLzKnBgSGkgKbhMhH',
          status: 'Success'
        }
      }
    */
  } catch(error){
    console.log(error)
  }
}

accessControl()
