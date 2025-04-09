import React from 'react';
import PageLayout from '../components/PageLayout';
import { ComingSoon } from '@gods.work/ui';

export default function Community() {
  return (
    <PageLayout
      title="DPoP Community - Organizations Using Proof of Possession"
      description="Discover the growing ecosystem of organizations and communities implementing DPoP for enhanced security and user sovereignty."
    >
      <ComingSoon />
    </PageLayout>
  );
}
