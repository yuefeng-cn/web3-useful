'use client';

import React from 'react';

interface ButtonProps {
  toAddress: string;
}

const Button: React.FC<ButtonProps> = ({ toAddress }) => {
  const handleClick = () => {
    window.open(`https://vscode.blockscan.com/ethereum/${toAddress}`, '_blank');
  };

  return (
    <button
      className="ml-2 px-3 py-1 bg-blue-500 text-white rounded"
      onClick={handleClick}
    >
      查看源码
    </button>
  );
};

export default Button;