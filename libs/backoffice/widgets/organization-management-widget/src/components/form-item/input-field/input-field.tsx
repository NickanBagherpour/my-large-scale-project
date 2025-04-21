import { Form, FormItemProps } from 'antd';
import { SizeType } from 'antd/lib/config-provider/SizeContext';

import { Input } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';

interface InputFieldPropsType extends FormItemProps {
  size?: SizeType;
  name: string;
  placeholder: string;
  maxLength?: number;
  minLength?: number;
  allow?: 'number' | RegExp | 'all' | 'letter';
  label: string;
  rules?: any[];
}
export const InputField = ({
  name,
  label,
  placeholder,
  rules,
  minLength,
  maxLength = 250,
  allow = 'all',
  size = 'large',
  ...rest
}: InputFieldPropsType) => {
  const [t] = useTr();
  return (
    <Form.Item name={name} label={t(label)} rules={rules} {...rest}>
      <Input size={size} placeholder={t(placeholder)} maxLength={maxLength} allow={allow} minLength={minLength} />
    </Form.Item>
  );
};
