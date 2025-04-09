import React from 'react';
import PageLayout from '../../components/PageLayout';
import { ComingSoon } from '@gods.work/ui';

export default function Blog() {
  return (
    <PageLayout
      title="DPoP Blog - Latest Updates and Insights"
      description="Stay up to date with the latest developments, tutorials, and insights about Demonstrating Proof of Possession technology."
    >
      <ComingSoon />
    </PageLayout>
  );
}