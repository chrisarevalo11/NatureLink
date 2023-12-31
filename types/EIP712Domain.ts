export interface EIP712StandardDomain {
	name: string
	version: string
	chainId?: number
	verifyingContract: string
}
/**
 * @internal
 */
export interface EIP712PolygonDomain {
	name: string
	version: string
	verifyingContract: string
	salt: string
}
/**
 * @internal
 */
export type EIP712Domain = EIP712StandardDomain | EIP712PolygonDomain
