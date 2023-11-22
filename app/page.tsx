'use client'
import { useOwnedHandles, useProfile } from '@lens-protocol/react-web';
import { ConnectWallet, useWallet } from '@thirdweb-dev/react';

export default function Home() {
  const { data, error, loading } = useProfile({
    forHandle: 'test/rookie',
  });

  const handle =  useOwnedHandles({
    for: '0xD496C2D3422F86dCca5b2d7C8728dEDEF6cEE9d0',
  });
  

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ConnectWallet />

      {loading && <p>Cargando perfil...</p>}
      {error && <p>Error al cargar el perfil.</p>}
      {handle && <h1>{JSON.stringify(handle)}</h1>} 
    </main>
  );
}

