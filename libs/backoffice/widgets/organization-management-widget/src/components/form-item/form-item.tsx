import { Form } from 'antd';
import { InputField } from './input-field/input-field';
import { ReactNode } from 'react';
interface FormItemPropsType {
  name: string;
  label?: string;
  rules?: any[];
  children: ReactNode;
}
export const FormItem = ({ name, label, rules, children, ...rest }: FormItemPropsType) => (
  <Form.Item name={name} label={label} rules={rules} {...rest}>
    {children}
  </Form.Item>
);

FormItem.InputField = InputField;
// FormItem.DatePikerField= DatePikerField;
// FormItem.SelectField= SelectField;
