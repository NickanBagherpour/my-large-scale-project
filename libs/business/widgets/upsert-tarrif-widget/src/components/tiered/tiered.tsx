import { useTr } from '@oxygen/translation';
import * as S from './tiered.style';
import AddCondition from '../add-condition/add-condition';
import { Form } from 'antd';
import { RuleRender } from 'antd/es/form';
import { tiered, serviceTariffName, TIERED_TARIFF_NAMES } from '../../utils';

type Props = {
  rule: RuleRender;
};

export default function Tiered(props: Props) {
  const { rule } = props;
  const [t] = useTr();

  return (
    <Form.Item name={[serviceTariffName, tiered]} rules={[rule]}>
      <Form.List name={[serviceTariffName, tiered]}>
        {(childrenFields, { add, remove }) => {
          return (
            <>
              {childrenFields.map((child, idx) => (
                <S.Article key={child.key}>
                  <S.Index>{idx + 1}</S.Index>
                  <span>{t('from')}</span>

                  <Form.Item name={[child.name, TIERED_TARIFF_NAMES.from]} rules={[rule]}>
                    <S.Input placeholder={t('count')} />
                  </Form.Item>

                  <span>{t('to')}</span>

                  <Form.Item name={[child.name, TIERED_TARIFF_NAMES.to]} rules={[rule]}>
                    <S.Input placeholder={t('count')} />
                  </Form.Item>

                  <span>{t('request_tariff_applies')}</span>

                  <Form.Item name={[child.name, TIERED_TARIFF_NAMES.tariff]} rules={[rule]}>
                    <S.Input placeholder={t('tariff_irr')} />
                  </Form.Item>

                  <span>{t('calculated_in_irr')}</span>

                  <S.TrashBtn variant='link' color='error' onClick={() => remove(child.name)}>
                    <i className='icon-trash' />
                  </S.TrashBtn>
                </S.Article>
              ))}

              <AddCondition tariffType='tiered' onClick={() => add('')} />
            </>
          );
        }}
      </Form.List>
    </Form.Item>
  );
}
