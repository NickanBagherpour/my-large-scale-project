import { useTr } from '@oxygen/translation';
import * as S from './special.style';
import AddCondition from '../add-condition/add-condition';
import { Form } from 'antd';
import { RuleRender } from 'antd/es/form';
import { SPECIAL_TARIFF_NAMES, tariff } from '../../utils';
import { Input } from '@oxygen/ui-kit';

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
                    <Input.Money placeholder={t('amount_irr')} allowClear={false} showLetter={false} />
                  </Form.Item>

                  <span>{t('to')}</span>
                  <Form.Item name={[child.name, SPECIAL_TARIFF_NAMES.to]}>
                    <Input.Money placeholder={t('amount_irr')} allowClear={false} showLetter={false} />
                  </Form.Item>

                  <span>{t('rial_applicable')}</span>
                  <Form.Item name={[child.name, SPECIAL_TARIFF_NAMES.percent]}>
                    <Input placeholder={t('percent')} />
                  </Form.Item>

                  <span>{t('tariff_percent_min')}</span>
                  <Form.Item name={[child.name, SPECIAL_TARIFF_NAMES.minimum]}>
                    <Input.Money placeholder={t('tariff_irr')} allowClear={false} showLetter={false} />
                  </Form.Item>

                  <span>{t('max_tariff')}</span>
                  <Form.Item name={[child.name, SPECIAL_TARIFF_NAMES.maximum]}>
                    <Input.Money placeholder={t('tariff_irr')} allowClear={false} showLetter={false} />
                  </Form.Item>

                  <span>{t('calculated')}</span>

                  <S.TrashBtn variant='link' color='error' onClick={() => remove(child.name)}>
                    <i className='icon-trash' />
                  </S.TrashBtn>
                </S.Article>
              ))}

              <AddCondition tariffType='special' onClick={() => add('')} />
            </S.Container>
          );
        }}
      </Form.List>
    </Form.Item>
  );
}
