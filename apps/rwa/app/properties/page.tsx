'use client'

import { Sidebar } from '../../components/sidebar'
import { Header } from '../../components/header'
import { PropertyList } from '../../components/property-list'

import { useState, useEffect } from 'react';
import { getProperties } from '@gods.work/web3';
import { Property } from '../../app/types/property';

export default function Properties() {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const properties = await getProperties();
    // console.log('properties: ', properties);
    setProperties(properties);
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Properties</h2>
          <PropertyList properties={properties} />
        </main>
      </div>
    </div>
  )
}

