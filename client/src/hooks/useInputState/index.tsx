import React, { useState } from 'react';

type InitialInputValue = {
  [key: string]: string;
};

export const useInputState = (
  initialVal: InitialInputValue
): [
  InitialInputValue,
  (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void,
  React.Dispatch<React.SetStateAction<InitialInputValue>>
] => {
  const [state, setState] = useState(initialVal);
  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  return [state, handleInputChange, setState];
};
