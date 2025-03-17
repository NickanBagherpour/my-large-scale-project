import { useTr } from '@oxygen/translation';
import AddCondition from '../add-condition/add-condition';
import { Form } from 'antd';
import { RuleRender } from 'antd/es/form';
import { SPECIAL_TARIFF_NAMES, TARIFF } from '../../utils';
import { Input } from '@oxygen/ui-kit';
import DisabledContext from 'antd/es/config-provider/DisabledContext';
import { use } from 'react';
import { Container, TrashBtn, Article, Index } from '../input-row/input-row.style';

type Props = {
  rules: RuleRender[];
};

export default function Special(props: Props) {
  const { rules } = props;
  const [t] = useTr();
  const disabled = use(DisabledContext);

  const emptyCondition = {
    [SPECIAL_TARIFF_NAMES.to]: null,
    [SPECIAL_TARIFF_NAMES.from]: null,
    [SPECIAL_TARIFF_NAMES.percent]: null,
    [SPECIAL_TARIFF_NAMES.minimum]: null,
    [SPECIAL_TARIFF_NAMES.maximum]: null,
  };

  return (
    <Form.Item name={[TARIFF.special]} rules={rules}>
      <Form.List name={[TARIFF.special]}>
        {(childrenFields, { add, remove }) => {
          return (
            <Container>
              {childrenFields.map((child, idx) => (
                <Article key={idx}>
                  <Index>{idx + 1}</Index>

                  <span>{t('reusable.from_transaction')}</span>
                  <Form.Item name={[child.name, SPECIAL_TARIFF_NAMES.from]} rules={rules}>
                    <Input.Money placeholder={t('reusable.amount_irr')} showLetter={false} />
                  </Form.Item>

                  <span>{t('reusable.to')}</span>
                  <Form.Item name={[child.name, SPECIAL_TARIFF_NAMES.to]} rules={rules}>
                    <Input.Money placeholder={t('reusable.amount_irr')} showLetter={false} />
                  </Form.Item>

                  <span>{t('reusable.rial_applicable')}</span>
                  <Form.Item name={[child.name, SPECIAL_TARIFF_NAMES.percent]} rules={rules}>
                    <Input placeholder={t('reusable.percent')} />
                  </Form.Item>

                  <span>{t('reusable.tariff_percent_min')}</span>
                  <Form.Item name={[child.name, SPECIAL_TARIFF_NAMES.minimum]} rules={rules}>
                    <Input.Money placeholder={t('reusable.tariff_irr')} showLetter={false} />
                  </Form.Item>

                  <span>{t('reusable.max_tariff')}</span>
                  <Form.Item name={[child.name, SPECIAL_TARIFF_NAMES.maximum]} rules={rules}>
                    <Input.Money placeholder={t('reusable.tariff_irr')} showLetter={false} />
                  </Form.Item>

                  <span>{t('reusable.calculated')}</span>

                  <TrashBtn
                    disabled={disabled || childrenFields.length === 1}
                    variant='link'
                    color='error'
                    onClick={() => remove(child.name)}
                  >
                    <i className='icon-trash' />
                  </TrashBtn>
                </Article>
              ))}

              <AddCondition tariffType='special' onClick={() => add(emptyCondition)} />
            </Container>
          );
        }}
      </Form.List>
    </Form.Item>
  );
}
