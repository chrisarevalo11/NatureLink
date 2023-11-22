"use client";

import {
  ThirdwebProvider,
  ChainId,
  metamaskWallet,
  embeddedWallet,
} from "@thirdweb-dev/react";
export function ThirdWebProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      activeChain={ChainId.Mumbai}
      supportedWallets={[metamaskWallet(), embeddedWallet()]}
    >
      {children}
    </ThirdwebProvider>
  );
}
