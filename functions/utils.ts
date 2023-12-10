import { BigNumber, ethers } from 'ethers'

export function toDecimal(amount: number): BigNumber {
	return ethers.utils.parseEther(amount.toString())
}

export function formatAddress(address: string): string {
	return `${address.slice(0, 6)}...${address.slice(-4)}`
}
