import { ERC20ABI } from '@/abi/ERC20'
import { ethers } from 'ethers'


const provider = 'http://10.8.6.153:2510'

function getProvider(rpc: string) {
    return new ethers.JsonRpcProvider(rpc)
}

export async function getTransaction(rpc: string, txHash: string) {
    return await getProvider(rpc).getTransaction(txHash)
}
export async function getTransactionReceipt(rpc: string, txHash: string) {
    return await getProvider(rpc).getTransactionReceipt(txHash)
}

export async function getTokenInfo(rpc: string, tokenAddress: string, chainId: number) {
    if (chainId === 1) {
        const abi = ERC20ABI
        const contract = new ethers.Contract(tokenAddress, abi, getProvider(rpc))
        const name = await contract.name()
        const decimals = await contract.decimals()
        return {
            name, decimals
        }
    }
    return null
}