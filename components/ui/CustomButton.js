import { Button } from '@/components/ui/button';
import React from 'react';

const CustomButton = ({ children, ...props }) => {
  return (
    <Button {...props}>
      {children}
    </Button>
  );
};

export default CustomButton;