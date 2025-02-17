import * as S from './multi-input.style';
import { Button } from '@oxygen/ui-kit';
import { Form, type FormInstance } from 'antd';
import { FormItem } from '../form-item/form-item.style';
import { Rule } from 'antd/es/form';
import { useTr } from '@oxygen/translation';
import { type RouteType } from '../../type/route.schema';

type Props = {
  rule: Rule[] | undefined;
  name: string;
  form: FormInstance<RouteType>;
};

export default function MultiInput(props: Props) {
  const { rule, name, form } = props;
  const [t] = useTr();
  const formValues = Form.useWatch(name, form);

  return (
    <FormItem name={name} label={t('path')} rules={rule}>
      <Form.List name={name}>
        {(childrenFields, { add, remove }) => {
          const removeDisabled = childrenFields.length === 1;
          return (
            <S.Container>
              {childrenFields.map((child, idx) => (
                <S.Action key={child.key}>
                  <FormItem name={[child.name, 'title']} rules={rule}>
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
                    onClick={add}
                    variant='link'
                    color='secondary'
                    htmlType='button'
                    disabled={!formValues?.[idx].title}
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
