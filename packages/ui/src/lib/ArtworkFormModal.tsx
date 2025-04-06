'use client';

import styled from 'styled-components';
import { Modal } from './Modal';
import { ArtworkForm } from './ArtworkForm';
import { Artwork } from '@gods.work/utils';

interface ArtworkFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (artwork: Artwork) => void;
  title?: string;
}

export function ArtworkFormModal({
  isOpen,
  onClose,
  onSuccess,
  title = 'Create New Artwork',
}: ArtworkFormModalProps) {
  const handleSuccess = (artwork: Artwork) => {
    if (onSuccess) {
      onSuccess(artwork);
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      maxWidth="600px"
    >
      <ModalContentWrapper>
        <ArtworkForm onSuccess={handleSuccess} />
      </ModalContentWrapper>
    </Modal>
  );
}

const ModalContentWrapper = styled.div`
  padding: 0;
  
  /* Override the default margin and padding from the ArtworkForm */
  > div {
    margin: 0;
    padding: 0;
    box-shadow: none;
  }
  
  /* Hide the form title since we're using the modal title */
  h2 {
    display: none;
  }
`;

