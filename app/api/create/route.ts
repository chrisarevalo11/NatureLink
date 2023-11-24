import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";

export async function POST(request: Request, response: Response) {
  // Configurar el SDK de thirdweb
  const provider = ethers.providers.getDefaultProvider("maticmum");
  const sdk = new ThirdwebSDK(provider);

  // Obtener el contrato
  const contract = await sdk.getContract(
    "0xB6558651A3A4646D83f1030921909fA87EE61A35"
  );

  // Llamar a la función del contrato y devolver el resultado
  try {
    const result = await contract.call('getAllProjects');
    return new Response(JSON.stringify({ result }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error }));
  }
}
