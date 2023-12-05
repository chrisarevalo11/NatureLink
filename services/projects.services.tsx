import { Contract, Wallet, ethers } from "ethers";
import natureLinkJson from "../deployments/mumbai/NatureLink.json";

const { NEXT_PUBLIC_POLYGON_MUMBAI_RPC_URL, NEXT_PUBLIC_PRIVATE_KEY } =
  process.env;

if (!NEXT_PUBLIC_POLYGON_MUMBAI_RPC_URL || !NEXT_PUBLIC_PRIVATE_KEY) {
  throw new Error(
    "Please set a valid RPC URL and private key in the environment variables"
  );
}

const provider = new ethers.providers.JsonRpcProvider(
  NEXT_PUBLIC_POLYGON_MUMBAI_RPC_URL
);
const signer = new Wallet(NEXT_PUBLIC_PRIVATE_KEY, provider);

const naturelinkContract: Contract = new Contract(
  natureLinkJson.address,
  natureLinkJson.abi,
  signer
);

export async function getAllProjects(): Promise<any> {
  const projects = await naturelinkContract.getAllProjects();
  console.log("projects: ", projects);
  return projects;
}