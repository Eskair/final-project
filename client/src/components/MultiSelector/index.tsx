import React, {
  Component,
  KeyboardEventHandler,
  useEffect,
  useState,
} from 'react';

import CreatableSelect from 'react-select/creatable';
import { OnChangeValue } from 'react-select';

const components = {
  DropdownIndicator: null,
};

interface Option {
  label: string;
  value: string;
}

const createOption = (label: string) => ({
  label,
  value: label,
});

interface State {
  inputValue: string;
  value: Option[];
}

export const MultiSelector = ({
  options,
  setSprintOptions,
}: {
  options: string[];
  setSprintOptions: (options: string[]) => void;
}) => {
  const initialValue = options.map((option) => ({
    label: option,
    value: option,
  }));
  const [state, setState] = useState<State>({
    inputValue: '',
    value: initialValue,
  });

  useEffect(() => {
    //update options value of sprintInfo
    const updatedOptions = state.value.map((obj) => obj.value);
    setSprintOptions(updatedOptions);
  }, [state.value]);

  const { inputValue, value } = state;
  const handleChange = (value: OnChangeValue<Option, true>) => {
    // @ts-ignore
    setState({ ...state, value });
  };
  const handleInputChange = (inputValue: string) => {
    setState({ ...state, inputValue });
  };
  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    const { inputValue, value } = state;
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        setState({
          inputValue: '',
          value: [...value, createOption(inputValue)],
        });
        event.preventDefault();
    }
  };

  return (
    <CreatableSelect
      theme={(theme) => ({
        ...theme,
        borderRadius: 0,
        colors: {
          ...theme.colors,
          primary: 'pink',
        },
      })}
      components={components}
      inputValue={inputValue}
      isClearable
      isMulti
      menuIsOpen={false}
      onChange={handleChange}
      onInputChange={handleInputChange}
      onKeyDown={handleKeyDown}
      placeholder='Type a new option and press enter'
      value={value}
    />
  );
};
