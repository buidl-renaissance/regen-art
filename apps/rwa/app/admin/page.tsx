'use client'

import { Sidebar } from '../../components/sidebar'
import { Header } from '../../components/header'
import { AdminInvestorManagement } from '../../components/admin-investor-management'
import { useState, useEffect } from 'react';
import {
  getAuthorizedVerifiers,
  getAllInvestorsDetails,
  verifyInvestor,
  authorizeVerifier,
} from '@gods.work/web3';

export default function AdminPage() {

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

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Admin Panel</h2>
          <AdminInvestorManagement />
        </main>
      </div>
    </div>
  )
}

