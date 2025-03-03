"use client";

import { useState } from "react";

const FundPage = () => {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Example Coinbase URL - replace with actual integration
      const coinbaseUrl = `https://pay.coinbase.com/buy?appId=f61d0358-28f7-4d80-95fd-0950a1b3091b&addresses={"0x3C6eF34939aaA850bA787cB775128746f86b8661":["base"]}&assets=["USDC"]&presetFiatAmount=${amount}&currency=USD`;
      window.location.href = coinbaseUrl;
    } catch (err) {
      console.error(err);
      setError("Failed to generate payment link. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 flex justify-center items-start">
      <div className="max-w-[600px] w-full p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">
          Fund Your Account
        </h1>
        
        <p className="mb-8 text-gray-600">
          Purchase crypto instantly using your credit card or bank account through our secure Coinbase integration.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block mb-2">Amount (USD)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-2 pl-8 border rounded"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-500 mb-4">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={!amount || isLoading}
            className={`w-full py-3 px-4 rounded bg-blue-600 text-white font-medium
              ${(!amount || isLoading) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
          >
            {isLoading ? "Processing..." : "Continue to Payment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FundPage;
