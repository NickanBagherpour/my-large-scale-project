import { Dropdown } from '@oxygen/ui-kit';
import * as S from './tag-picker.style';
import { CodeTitle } from '../../types';
import { type CSSProperties, useContext } from 'react';
import DisabledContext from 'antd/es/config-provider/DisabledContext';

const convert = (item: CodeTitle[] | undefined) => {
  return item?.map((tag) => ({ key: tag.code, label: tag.title, value: tag.code })) ?? [];
};

type Props =
  | {
      isLoading: boolean;
      title: string;
      menu?: CodeTitle[];
      dropdownMinWidth: CSSProperties['width'];
    } & (
      | {
          value: CodeTitle[];
          onChange: (value: CodeTitle[]) => void;
        }
      | {
          value?: never;
          onChange?: never;
        }
    );

export default function TagPicker(props: Props) {
  const { title, onChange, value, menu, isLoading, dropdownMinWidth } = props;

  // Retrieves the `disabled` state from the parent form context to control whether the form fields should be disabled.
  const isFormDisabled = useContext(DisabledContext);

  const handleChange = (items /* TODO: find a type for this */) => {
    if (onChange) onChange(items.map((item) => ({ code: item.value, title: item.label })));
  };

  const deleteItem = (item: CodeTitle) => {
    if (onChange) onChange(value.filter((selectedItem) => selectedItem.code !== item.code));
  };

  return (
    <S.Container $dropdownMinWidth={dropdownMinWidth}>
      <Dropdown.Select
        disabled={isFormDisabled}
        onChange={handleChange}
        value={convert(value)}
        multiSelect
        loading={isLoading}
        menu={convert(menu)}
      >
        {title}
      </Dropdown.Select>

      {value?.map((item) => (
        <S.Chip
          closable={!isFormDisabled}
          ellipsis
          closeIcon
          type='active'
          key={item.code}
          tooltipOnEllipsis
          tooltipTitle={item.title}
          onClose={() => deleteItem(item)}
        >
          {item.title}
        </S.Chip>
      ))}
    </S.Container>
  );
}
