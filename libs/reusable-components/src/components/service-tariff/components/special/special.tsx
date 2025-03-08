import { useTr } from '@oxygen/translation';
import * as S from './special.style';
import AddCondition from '../add-condition/add-condition';
import { Form } from 'antd';
import { RuleRender } from 'antd/es/form';
import { SPECIAL_TARIFF_NAMES, TARIFF } from '../../utils';
import { Input } from '@oxygen/ui-kit';
import DisabledContext from 'antd/es/config-provider/DisabledContext';
import { use } from 'react';

type Props = {
  rule: RuleRender;
};

export default function Special(props: Props) {
  const { rule } = props;
  const [t] = useTr();
  const disabled = use(DisabledContext);

  return (
    <Form.Item name={[TARIFF.special]} rules={[rule]}>
      <Form.List name={[TARIFF.special]}>
        {(childrenFields, { add, remove }) => {
          return (
            <S.Container>
              {childrenFields.map((child, idx) => (
                <S.Article key={idx}>
                  <S.Index>{idx + 1}</S.Index>

                  <span>{t('reusable.from_transaction')}</span>
                  <Form.Item name={[child.name, SPECIAL_TARIFF_NAMES.from]} rules={[rule]}>
                    <Input.Money placeholder={t('reusable.amount_irr')} showLetter={false} />
                  </Form.Item>

                  <span>{t('reusable.to')}</span>
                  <Form.Item name={[child.name, SPECIAL_TARIFF_NAMES.to]} rules={[rule]}>
                    <Input.Money placeholder={t('reusable.amount_irr')} showLetter={false} />
                  </Form.Item>

                  <span>{t('reusable.rial_applicable')}</span>
                  <Form.Item name={[child.name, SPECIAL_TARIFF_NAMES.percent]} rules={[rule]}>
                    <Input placeholder={t('reusable.percent')} />
                  </Form.Item>

                  <span>{t('reusable.tariff_percent_min')}</span>
                  <Form.Item name={[child.name, SPECIAL_TARIFF_NAMES.minimum]} rules={[rule]}>
                    <Input.Money placeholder={t('reusable.tariff_irr')} showLetter={false} />
                  </Form.Item>

                  <span>{t('reusable.max_tariff')}</span>
                  <Form.Item name={[child.name, SPECIAL_TARIFF_NAMES.maximum]} rules={[rule]}>
                    <Input.Money placeholder={t('reusable.tariff_irr')} showLetter={false} />
                  </Form.Item>

                  <span>{t('reusable.calculated')}</span>

                  <S.TrashBtn disabled={disabled} variant='link' color='error' onClick={() => remove(child.name)}>
                    <i className='icon-trash' />
                  </S.TrashBtn>
                </S.Article>
              ))}

              <AddCondition
                tariffType='special'
                onClick={() =>
                  add({
                    [SPECIAL_TARIFF_NAMES.to]: null,
                    [SPECIAL_TARIFF_NAMES.from]: null,
                    [SPECIAL_TARIFF_NAMES.percent]: null,
                    [SPECIAL_TARIFF_NAMES.minimum]: null,
                    [SPECIAL_TARIFF_NAMES.maximum]: null,
                  })
                }
              />
            </S.Container>
          );
        }}
      </Form.List>
    </Form.Item>
  );
}
