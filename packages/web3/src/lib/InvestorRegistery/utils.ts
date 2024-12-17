import { InvestorRegistryContract } from './contract';
import { getProvider } from '../provider';
import { getWalletSigner } from '../connectWallet';

export const getAuthorizedVerifiers = async (): Promise<any> => {
  const contract = InvestorRegistryContract(getProvider());
  return await contract['getAuthorizedVerifiers']();
};

// Function for client-side interaction to create a new property
export const getAllInvestors = async (): Promise<any> => {
  const contract = InvestorRegistryContract(getProvider());
  return await contract['getAllInvestors']();
};

export const getAllInvestorsDetails = async (): Promise<any> => {
  const contract = InvestorRegistryContract(getProvider());
  return await contract['getAllInvestorsDetails']();
};

interface RegisterInvestorData {
  name: string;
}

export const registerInvestor = async (
  registerInvestorData: RegisterInvestorData
): Promise<{ receipt: any; txHash: string }> => {
  const { name } = registerInvestorData;

  const signer = await getWalletSigner();

  const contract = InvestorRegistryContract(signer);

  const tx = await contract['registerInvestor'](name);

  const receipt = await tx.wait();

  return { receipt, txHash: tx.hash };
};

/** Authorized Verifier Functions */

interface AuthorizeVerifierData {
  verifierAddress: string;
}

export const authorizeVerifier = async (
  authorizeVerifierData: AuthorizeVerifierData
): Promise<{ receipt: any; txHash: string }> => {
  const { verifierAddress } = authorizeVerifierData;

  const signer = await getWalletSigner();

  const contract = InvestorRegistryContract(signer);

  const tx = await contract['authorizeVerifier'](verifierAddress, {
    gasLimit: 16721975,
  });

  const receipt = await tx.wait();

  return { receipt, txHash: tx.hash };
};

/** Verified Investor Functions */
interface VerifyInvestorData {
  investorAddress: string;
}

export const verifyInvestor = async (
  verifyInvestorData: VerifyInvestorData
): Promise<{ receipt: any; txHash: string }> => {
  const { investorAddress } = verifyInvestorData;

  const signer = await getWalletSigner();

  const contract = InvestorRegistryContract(signer);

  const tx = await contract['verifyInvestor'](investorAddress, {
    gasLimit: 16721975,
  });

  // Wait for transaction to be mined
  const receipt = await tx.wait();

  return { receipt, txHash: tx.hash };
};
