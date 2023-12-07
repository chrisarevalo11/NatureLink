import { BigNumber, ethers } from 'ethers'

export function toDecimal(amount: number): BigNumber {
	return ethers.utils.parseEther(amount.toString())
}
