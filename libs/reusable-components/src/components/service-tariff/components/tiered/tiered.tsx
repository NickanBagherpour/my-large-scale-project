import { useTr } from '@oxygen/translation';
import * as S from './tiered.style';
import AddCondition from '../add-condition/add-condition';
import { Form } from 'antd';
import { RuleRender } from 'antd/es/form';
import { TARIFF, TIERED_TARIFF_NAMES } from '../../utils';
import { Input } from '@oxygen/ui-kit';

type Props = {
  rule: RuleRender;
};

export default function Tiered(props: Props) {
  const { rule } = props;
  const [t] = useTr();

  return (
    <Form.Item name={[TARIFF.tiered]} rules={[rule]}>
      <Form.List name={[TARIFF.tiered]}>
        {(childrenFields, { add, remove }) => {
          return (
            <S.Container>
              {childrenFields.map((child, idx) => (
                <S.Article key={child.key}>
                  <S.Index>{idx + 1}</S.Index>
                  <span>{t('from')}</span>

                  <Form.Item name={[child.name, TIERED_TARIFF_NAMES.from]} rules={[rule]}>
                    <Input placeholder={t('count')} />
                  </Form.Item>

                  <span>{t('to')}</span>

                  <Form.Item name={[child.name, TIERED_TARIFF_NAMES.to]} rules={[rule]}>
                    <Input placeholder={t('count')} />
                  </Form.Item>

                  <span>{t('request_tariff_applies')}</span>

                  <Form.Item name={[child.name, TIERED_TARIFF_NAMES.tariff]} rules={[rule]}>
                    <Input.Money placeholder={t('tariff_irr')} showLetter={false} />
                  </Form.Item>

                  <span>{t('calculated_in_irr')}</span>

                  <S.TrashBtn variant='link' color='error' onClick={() => remove(child.name)}>
                    <i className='icon-trash' />
                  </S.TrashBtn>
                </S.Article>
              ))}

              <AddCondition
                tariffType='tiered'
                onClick={() =>
                  add({
                    [TIERED_TARIFF_NAMES.from]: null,
                    [TIERED_TARIFF_NAMES.to]: null,
                    [TIERED_TARIFF_NAMES.tariff]: null,
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
