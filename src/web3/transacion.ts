import { ERC20ABI } from '@/abi/ERC20'
import { ethers } from 'ethers'


const provider = 'http://10.8.6.153/2700'

function getProvider(rpc: string) {
    return new ethers.JsonRpcProvider(rpc)
}

export async function getTransaction(txHash: string) {
    return await getProvider(provider).getTransaction(txHash)
}
export async function getTransactionReceipt(txHash: string) {
    return await getProvider(provider).getTransactionReceipt(txHash)
}

export async function getTokenInfo(tokenAddress: string, chainId: number) {
    if (chainId === 1) {
        const abi = ERC20ABI
        const contract = new ethers.Contract(tokenAddress, abi, getProvider(provider))
        const name = await contract.name()
        const decimals = await contract.decimals()
        return {
            name, decimals
        }
    }
    return null
}