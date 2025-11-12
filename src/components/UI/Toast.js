import React from 'react';
import { Toaster as Sonner, toast } from 'sonner';

const Toaster = (props) => {
  return <Sonner {...props} />;
};

export { Toaster, toast };
