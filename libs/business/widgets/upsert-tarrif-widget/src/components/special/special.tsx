import { useTr } from '@oxygen/translation';
import * as S from './special.style';
import AddCondition from '../add-condition/add-condition';
import { Form } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import { specialTariff } from '../../types';

const name = 'tiered';

const initialValues = {
  [name]: [
    {
      from: '',
      to: '',
      tariff: '',
    },
  ],
};

export default function Special() {
  const [t] = useTr();
  const rule = createSchemaFieldRule(specialTariff(t));

  return (
    <S.Form initialValues={initialValues}>
      <Form.Item name={name} rules={[rule]}>
        <Form.List name={name}>
          {(childrenFields, { add, remove }) => {
            return (
              <>
                {childrenFields.map((child, idx) => (
                  <Form.Item key={child.name} name={[child.name /* , 'title' if it is nested */]} rules={[rule]}>
                    <S.Article key={idx}>
                      <S.Index>{idx + 1}</S.Index>

                      <span>{t('from_transaction')}</span>
                      <S.Input placeholder={t('amount_irr')} />

                      <span>{t('to')}</span>
                      <S.Input placeholder={t('amount_irr')} />

                      <span>{t('request_tariff_applies')}</span>
                      <S.Input placeholder={t('tariff_irr')} />

                      <span>{t('max_tariff_irr')}</span>
                      <S.Input placeholder={t('tariff_irr')} />

                      <span>{t('be_calculated')}</span>

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
