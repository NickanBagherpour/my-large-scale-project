import { useTr } from '@oxygen/translation';
import * as S from './tiered.style';
import AddCondition from '../add-condition/add-condition';
import { Form } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import { tieredTariff } from '../../types';

const name = 'tiered';

const initialValues = {
  [name]: [
    {
      from: '',
      to: '',
      minimum: '',
      maximum: '',
    },
  ],
};

export default function Tiered() {
  const [t] = useTr();
  const rule = createSchemaFieldRule(tieredTariff(t));

  return (
    <S.Form initialValues={initialValues}>
      <Form.Item name={name} rules={[rule]}>
        <Form.List name={name}>
          {(childrenFields, { add, remove }) => {
            return (
              <>
                {childrenFields.map((child, idx) => (
                  <Form.Item name={[child.name /* , 'title' if it is nested */]} rules={[rule]}>
                    <S.Article key={child.key}>
                      <S.Index>{idx + 1}</S.Index>
                      <span>{t('from')}</span>
                      <S.Input placeholder={t('count')} />
                      <span>{t('to')}</span>
                      <S.Input placeholder={t('count')} />
                      <span>{t('request_tariff_applies')}</span>
                      <S.Input placeholder={t('tariff_irr')} />
                      <span>{t('calculated_in_irr')}</span>

                      <S.TrashBtn variant='link' color='error' onClick={() => remove(child.name)}>
                        <i className='icon-trash' />
                      </S.TrashBtn>
                    </S.Article>
                  </Form.Item>
                ))}

                <AddCondition tariffType='tiered' onClick={() => add('')} />
              </>
            );
          }}
        </Form.List>
      </Form.Item>
    </S.Form>
  );
}
