import { Form } from 'antd';
import { InputField } from './input-field/input-field';
import { ReactNode } from 'react';
import { useTr } from '@oxygen/translation';
interface FormItemPropsType {
  name: string;
  label: string;
  rules?: any[];
  children: ReactNode;
}
export const FormItem = ({ name, label, rules, children, ...rest }: FormItemPropsType) => {
  const [t] = useTr();
  return (
    <Form.Item name={name} label={t(label)} rules={rules} {...rest}>
      {children}
    </Form.Item>
  );
};

FormItem.InputField = InputField;
// FormItem.DatePikerField= DatePikerField;
// FormItem.SelectField= SelectField;
