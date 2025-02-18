import * as S from './multi-input.style';
import { Button } from '@oxygen/ui-kit';
import { Form, type FormInstance } from 'antd';
import { FormItem } from '../form-item/form-item.style';
import { Rule } from 'antd/es/form';
import { type RouteType } from '../../type/route.schema';
import { useTr } from '@oxygen/translation';
import { BorderedSection } from '@oxygen/reusable-components';

type Props = {
  rule: Rule[] | undefined;
  name: string;
  label: string;
  form: FormInstance<RouteType>;
};

export default function MultiInput(props: Props) {
  const { rule, name, form, label } = props;
  const [t] = useTr();
  const formValues = Form.useWatch(name, form);

  return (
    <BorderedSection>
      <FormItem name={name} rules={rule}>
        <Form.List name={name}>
          {(childrenFields, { add, remove }) => {
            const removeDisabled = childrenFields.length === 1;
            return (
              <>
                <S.Header>
                  <S.Title>{label}</S.Title>
                  <Button
                    onClick={() => add('' /* this is the initial value of the new input */)}
                    variant='filled'
                    color='primary'
                    icon={<i className='icon-plus' />}
                    disabled={!formValues?.at(-1)}
                  >
                    {t('button.add')}
                  </Button>
                </S.Header>
                <S.Inputs>
                  {childrenFields.map((child) => (
                    <S.Action key={child.key}>
                      <FormItem name={[child.name /* , 'title' if it is nested */]} rules={rule}>
                        <S.PlainTextInput
                          suffix={
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
                          }
                        />
                      </FormItem>
                    </S.Action>
                  ))}
                </S.Inputs>
              </>
            );
          }}
        </Form.List>
      </FormItem>
    </BorderedSection>
  );
}
