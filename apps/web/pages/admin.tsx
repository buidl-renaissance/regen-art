import { useState, useEffect } from 'react';
import {
  getAuthorizedVerifiers,
  getAllInvestorsDetails,
  verifyInvestor,
  authorizeVerifier,
} from '@gods.work/web3';

export default function Admin() {
  const [verifiers, setVerifiers] = useState<string[]>([]);
  const [investors, setInvestors] = useState<string[]>([]);
  const [newVerifier, setNewVerifier] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    console.log('LOAD DATA!!!');
    try {
      const verifiersResult = await getAuthorizedVerifiers();
      const investorsResult = await getAllInvestorsDetails();
      console.log('verifiersResult: ', verifiersResult);
      console.log('investorsResult: ', investorsResult);
      setVerifiers(verifiersResult);
      setInvestors(investorsResult);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleAddVerifier = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await authorizeVerifier({ verifierAddress: newVerifier });

      setSuccess('Verifier added successfully');
      setNewVerifier('');
      loadData();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyInvestor = async (investorAddress: string) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await verifyInvestor({ investorAddress });

      setSuccess('Investor verified successfully');
      loadData();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h2 className="text-2xl font-bold mb-8">Admin Dashboard</h2>

                {error && (
                  <div className="bg-red-50 text-red-500 p-4 rounded-md mb-6">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="bg-green-50 text-green-500 p-4 rounded-md mb-6">
                    {success}
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Add Verifier</h3>
                  <form onSubmit={handleAddVerifier}>
                    <div className="flex gap-4">
                      <input
                        type="text"
                        value={newVerifier}
                        onChange={(e) => setNewVerifier(e.target.value)}
                        placeholder="Verifier Address"
                        className="flex-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                      <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Add
                      </button>
                    </div>
                  </form>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">
                    Authorized Verifiers
                  </h3>
                  <ul className="divide-y divide-gray-200">
                    {verifiers?.map((verifier) => (
                      <li key={verifier} className="py-4">
                        {verifier}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Investors</h3>
                  <ul className="divide-y divide-gray-200">
                    {investors?.map((investorDetails: any) => (
                      <li
                        key={investorDetails.investor}
                        className="py-4 flex justify-between items-center"
                      >
                        <span>{investorDetails.name}</span>
                        <button
                          onClick={() => handleVerifyInvestor(investorDetails.investor)}
                          disabled={loading}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Verify
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
