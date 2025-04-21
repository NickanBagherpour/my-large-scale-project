import { Input } from '@oxygen/ui-kit';
import { Form } from 'antd';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { ReactNode } from 'react';
interface InputFieldPropsType {
  size?: SizeType;
  name: string;
  placeholder: string;
  maxLength?: number;
  minLength?: number;
  allow?: 'number' | RegExp | 'all' | 'letter';
  label?: string;
  rules?: any[];
  children: ReactNode;
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
}: InputFieldPropsType) => (
  <Form.Item name={name} label={label} rules={rules}>
    <Input size={size} placeholder={placeholder} maxLength={maxLength} allow={allow} minLength={minLength} />
  </Form.Item>
);
