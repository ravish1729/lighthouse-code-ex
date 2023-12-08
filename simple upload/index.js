import lighthouse from '@lighthouse-web3/sdk'
import * as dotenv from 'dotenv'
dotenv.config()

const uploadFile = async() => {
    const uploadResponse = await lighthouse.upload(
        'C:/Users/ravis/Desktop/eth india/simple upload/itachi.jpg', 
        process.env.API_KEY
      )
      console.log(uploadResponse)
}

uploadFile()
