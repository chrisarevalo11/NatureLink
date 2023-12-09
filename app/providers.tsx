'use client'

import React from 'react';
import { ThirdwebProvider, ChainId, metamaskWallet, embeddedWallet, useSigner, useSDK, useAddress } from '@thirdweb-dev/react';
import { Signer, ethers } from 'ethers';
import { LensProvider, RequiredSigner, development } from "@lens-protocol/react-web";
import { useTypedDataSignerWrapper } from '@/lib/typedDataSigner';
import { JsonRpcProvider } from "@ethersproject/providers";
import { Provider } from 'react-redux';
import { store } from '@/store/index';


function LensThirdwebProvider({ children, signer }: { children: React.ReactNode, signer?: Signer }) {
	const sdk = useSDK();
	const signerWrapped = useTypedDataSignerWrapper(signer, sdk);

	return (
		<LensProvider
			config={{
				environment: development,
				bindings: {
					getSigner: async () => signerWrapped as RequiredSigner,
					getProvider: async () => new JsonRpcProvider("https://mumbai.rpc.thirdweb.com")
				}
			}}
		>
			{children}
		</LensProvider>
	);
}

export function Providers({ children }: { children: React.ReactNode }) {
	let signer: Signer | undefined;

	if (typeof window !== 'undefined' && window.ethereum) {
		signer = new ethers.providers.Web3Provider(window.ethereum).getSigner() as Signer;
	}

	return (
		<Provider store={store}>
			<ThirdwebProvider
				clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
				activeChain={ChainId.Mumbai}
				signer={signer}
				supportedWallets={[
					metamaskWallet(),
					embeddedWallet()
				]}
			>
				<LensThirdwebProvider signer={signer}>
					{children}
				</LensThirdwebProvider>
			</ThirdwebProvider>
		</Provider>
	);

}
