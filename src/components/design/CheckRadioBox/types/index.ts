type CheckBoxType = {
  type: 'checkbox';
  multiple?: true | false;
};

type RadioType = {
  type: 'radio';
  multiple?: false;
};

export type CheckRadioType = {
  type?: 'checkbox' | 'radio';
  children?: any;
  value?: any;
  defaultChecked?: boolean;
  onChange?: (value: boolean) => void;
};
