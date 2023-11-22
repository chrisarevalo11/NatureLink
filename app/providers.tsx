'use client'
import { ThirdwebProvider, ChainId, metamaskWallet, embeddedWallet, useSigner, useSDK } from '@thirdweb-dev/react'
import { ethers } from 'ethers'
import { LensProvider, RequiredSigner, development } from "@lens-protocol/react-web";
import { useTypedDataSignerWrapper } from '@/lib/typedDataSigner';
import { JsonRpcProvider } from "@ethersproject/providers";

function LensThirdwebProvider({ children }: { children: React.ReactNode }) {
    const sdk = useSDK();
    const signer = useSigner();
    const signerWrapped = useTypedDataSignerWrapper(signer, sdk);

    return (
        <LensProvider
            config={{
                environment: development,
                bindings: {
                    getSigner: async () => signerWrapped as RequiredSigner,
                    getProvider: async () => new JsonRpcProvider("https://mumbai.rpc.thirdweb.com")
                }
                // @ts-ignore: TODO
            }}
        >
            {children}
        </LensProvider>
    );
}


export function Providers({ children }: {
    children: React.ReactNode
}) {

    return (
        <ThirdwebProvider
            clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
            activeChain={ChainId.Mumbai}
            supportedWallets={[
                metamaskWallet(),
                embeddedWallet()
            ]}
        >
            <LensThirdwebProvider>
            {children}
            </LensThirdwebProvider>
        </ThirdwebProvider>
    )
}