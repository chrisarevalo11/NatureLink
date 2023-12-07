import { CallOverrides } from 'ethers'
import { TransactionReceipt } from '@ethersproject/abstract-provider'
import { UseMutateAsyncFunction } from '@tanstack/react-query'

type contractFunction = UseMutateAsyncFunction<
	{
		receipt: TransactionReceipt
	},
	unknown,
	{
		args?: any[] | undefined
		overrides?: CallOverrides | undefined
	},
	unknown
> | null

export interface natureLinkFunctions {
	createProject: contractFunction
}
