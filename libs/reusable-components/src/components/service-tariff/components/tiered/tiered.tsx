import { useTr } from '@oxygen/translation';
import * as S from './tiered.style';
import AddCondition from '../add-condition/add-condition';
import { Form } from 'antd';
import { RuleRender } from 'antd/es/form';
import { TARIFF, TIERED_TARIFF_NAMES } from '../../utils';
import { Input } from '@oxygen/ui-kit';
import { use } from 'react';
import DisabledContext from 'antd/es/config-provider/DisabledContext';
import { Index, Article, TrashBtn, Container } from '../input-row/input-row.style';

type Props = {
  rules: RuleRender[];
};

export default function Tiered(props: Props) {
  const { rules } = props;
  const [t] = useTr();
  const disabled = use(DisabledContext);

  const emptyCondition = {
    [TIERED_TARIFF_NAMES.from]: null,
    [TIERED_TARIFF_NAMES.to]: null,
    [TIERED_TARIFF_NAMES.tariff]: null,
  };

  return (
    <Form.Item name={[TARIFF.tiered]} rules={rules}>
      <Form.List name={[TARIFF.tiered]}>
        {(childrenFields, { add, remove }) => {
          return (
            <Container>
              {childrenFields.map((child, idx) => (
                <Article key={child.key}>
                  <Index>{idx + 1}</Index>
                  <span>{t('reusable.from')}</span>

                  <Form.Item name={[child.name, TIERED_TARIFF_NAMES.from]} rules={rules}>
                    <Input placeholder={t('reusable.count')} />
                  </Form.Item>

                  <span>{t('reusable.to')}</span>

                  <Form.Item name={[child.name, TIERED_TARIFF_NAMES.to]} rules={rules}>
                    <Input placeholder={t('reusable.count')} />
                  </Form.Item>

                  <span>{t('reusable.request_tariff_applies')}</span>

                  <Form.Item name={[child.name, TIERED_TARIFF_NAMES.tariff]} rules={rules}>
                    <Input.Money placeholder={t('reusable.tariff_irr')} showLetter={false} />
                  </Form.Item>

                  <span>{t('reusable.calculated_in_irr')}</span>

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

              <AddCondition tariffType='tiered' onClick={() => add(emptyCondition)} />
            </Container>
          );
        }}
      </Form.List>
    </Form.Item>
  );
}
