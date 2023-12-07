'use client'

import React, { useEffect } from 'react';
import { useLogin } from '@lens-protocol/react-web';
import { useAddress } from "@thirdweb-dev/react";


export default function Home() {

  
  const { execute, loading, data, error } = useLogin();
  const address = useAddress(); // Retrieves the user's wallet address

  const login = async () => {
    if (address) {
      const result = await execute({ address });
      // Handle the result if needed
    } else {
      // Handle the case where the address is not available
      console.log(error);
      console.error("Wallet address not found. Please connect your wallet.");
    }
  };
  
  return (
    <div>
      {loading && <p>Cargando perfil...</p>}
      {error && <p>Error al cargar el perfil: {error.message}</p>}
      {data && <h1>{JSON.stringify(data)}</h1>}
      <button onClick={login}>Click me</button>
    </div>
  );
}

