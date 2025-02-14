import * as S from './multi-input.style';
import { CodeTitle } from '../../types';
import { getId } from '../../utils/get-id';
import DisabledContext from 'antd/es/config-provider/DisabledContext';
import { useContext } from 'react';

type Props =
  | {
      value: CodeTitle[];
      onChange: (props: CodeTitle[]) => void;
    }
  | Record<string, never>;

export default function MultiInput(props: Props) {
  const { value, onChange } = props;
  // Retrieves the `disabled` state from the parent form context to control whether the form fields should be disabled.
  const isFormDisabled = useContext(DisabledContext);

  const handleChange = ({ code, title }: CodeTitle) => {
    if (props.value) {
      const updatedValue = props.value.map((item) => (item.code === code ? { code, title } : item));
      onChange(updatedValue);
    }
  };

  const handleRemove = (code: number) => () => {
    const updatedValue = props.value.filter((item) => item.code !== code);
    onChange(updatedValue);
  };

  const handleAdd = () => {
    onChange(value.concat({ code: getId(), title: '' }));
  };

  const removeDisabled = value.length === 1 || isFormDisabled;

  return (
    <S.Container>
      {value?.map(({ code, title }, idx) => (
        <S.Action key={code}>
          <S.PlainTextInput value={title} onChange={(e) => handleChange({ code, title: e.target.value })} />
          <S.TrashBtn type='button' onClick={handleRemove(code)} disabled={removeDisabled}>
            <i className='icon-trash' />
          </S.TrashBtn>
          <S.PlusBtn type='button' onClick={handleAdd} disabled={idx !== value.length - 1 || !title || isFormDisabled}>
            <i className='icon-plus-circle' />
          </S.PlusBtn>
        </S.Action>
      ))}
    </S.Container>
  );
}
