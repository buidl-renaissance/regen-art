import React from 'react';
import { Modal } from '@gods.work/ui';
import { AuthView } from './AuthView';

export const AuthModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <AuthView />
    </Modal>
  );
};

