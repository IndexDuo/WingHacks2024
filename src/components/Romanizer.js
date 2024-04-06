import React from 'react';
import { romanizeKorean } from '../utils/romanizeKorean'; // Adjust the import path as needed

const Romanizer = ({ text }) => {
  return <div>{romanizeKorean(text)}</div>;
};
