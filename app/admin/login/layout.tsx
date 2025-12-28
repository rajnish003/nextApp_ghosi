import React from 'react';
import { Toaster } from 'react-hot-toast';

export default function Adminlogin({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: '#ffffff',
            color: '#333333',
          },
          success: {
            style: {
              border: '1px solid #22c55e',
              padding: '16px',
            },
            icon: '✅',
          },
          error: {
            style: {
              border: '1px solid #ef4444',
              padding: '16px',
            },
            icon: '❌',
          },
        }}
      />
    </section>
  );
}

// Add metadata for the help form section
export const metadata = {
  title: 'Get Help | Ghosi Community',
  description: 'Request assistance from our support team. We are here to help you.',
};