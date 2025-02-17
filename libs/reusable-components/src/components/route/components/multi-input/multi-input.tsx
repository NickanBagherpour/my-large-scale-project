import * as S from './multi-input.style';
import { Button } from '@oxygen/ui-kit';
import { Form, type FormInstance } from 'antd';
import { FormItem } from '../form-item/form-item.style';
import { Rule } from 'antd/es/form';
import { type RouteType } from '../../type/route.schema';

type Props = {
  rule: Rule[] | undefined;
  name: string;
  label: string;
  form: FormInstance<RouteType>;
};

export default function MultiInput(props: Props) {
  const { rule, name, form, label } = props;
  const formValues = Form.useWatch(name, form);

  return (
    <FormItem name={name} label={label} rules={rule}>
      <Form.List name={name}>
        {(childrenFields, { add, remove }) => {
          const removeDisabled = childrenFields.length === 1;
          return (
            <S.Container>
              {childrenFields.map((child, idx) => (
                <S.Action key={child.key}>
                  <FormItem name={[child.name /* , 'title' if it is nested */]} rules={rule}>
                    <S.PlainTextInput />
                  </FormItem>
                  <Button
                    size='small'
                    color='error'
                    variant='link'
                    htmlType='button'
                    onClick={() => remove(child.name)}
                    disabled={removeDisabled}
                  >
                    <S.Icon className='icon-trash' />
                  </Button>

                  <Button
                    size='small'
                    onClick={() => add('' /* this is the initial value of the new input */)}
                    variant='link'
                    color='secondary'
                    htmlType='button'
                    disabled={!formValues?.[idx]}
                  >
                    <S.Icon className='icon-plus-circle' />
                  </Button>
                </S.Action>
              ))}
            </S.Container>
          );
        }}
      </Form.List>
    </FormItem>
  );
}
