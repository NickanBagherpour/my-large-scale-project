import { useTr } from '@oxygen/translation';
import * as S from './special.style';
import AddCondition from '../add-condition/add-condition';
import { Form } from 'antd';
import { RuleRender } from 'antd/es/form';
import { SPECIAL_TARIFF_NAMES, tariff } from '../../utils';

type Props = {
  rule: RuleRender;
};

export default function Special(props: Props) {
  const { rule } = props;
  const [t] = useTr();

  return (
    <Form.Item name={[tariff.serviceTariff, tariff.special]} rules={[rule]}>
      <Form.List name={[tariff.serviceTariff, tariff.special]}>
        {(childrenFields, { add, remove }) => {
          return (
            <S.Container>
              {childrenFields.map((child, idx) => (
                <S.Article key={idx}>
                  <S.Index>{idx + 1}</S.Index>

                  <span>{t('from_transaction')}</span>
                  <Form.Item name={[child.name, SPECIAL_TARIFF_NAMES.from]}>
                    <S.Input placeholder={t('amount_irr')} />
                  </Form.Item>

                  <span>{t('to')}</span>
                  <Form.Item name={[child.name, SPECIAL_TARIFF_NAMES.to]}>
                    <S.Input placeholder={t('amount_irr')} />
                  </Form.Item>

                  <span>{t('request_tariff_applies')}</span>
                  <Form.Item name={[child.name, SPECIAL_TARIFF_NAMES.maximum]}>
                    <S.Input placeholder={t('tariff_irr')} />
                  </Form.Item>

                  <span>{t('max_tariff_irr')}</span>
                  <Form.Item name={[child.name, SPECIAL_TARIFF_NAMES.minimum]}>
                    <S.Input placeholder={t('tariff_irr')} />
                  </Form.Item>

                  <span>{t('be_calculated')}</span>

                  <S.TrashBtn variant='link' color='error' onClick={() => remove(child.name)}>
                    <i className='icon-trash' />
                  </S.TrashBtn>
                </S.Article>
              ))}

              <AddCondition tariffType='tiered' onClick={() => add('')} />
            </S.Container>
          );
        }}
      </Form.List>
    </Form.Item>
  );
}
