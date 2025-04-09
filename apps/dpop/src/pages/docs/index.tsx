import React from 'react';
import PageLayout from '../../components/PageLayout';
import { PageTitle, ComingSoon } from '@gods.work/ui';

export default function Blog() {
  return (
    <PageLayout
      title="DPoP Documentation"
      description="Stay up to date with the latest developments, tutorials, and insights about Demonstrating Proof of Possession technology."
    >
      <PageTitle>DPoP Documentation</PageTitle>
      <ComingSoon
        description="We're currently working on comprehensive documentation for DPoP implementation.
            Check back soon for detailed guides, API references, and examples."
      />
    </PageLayout>
  );
}
