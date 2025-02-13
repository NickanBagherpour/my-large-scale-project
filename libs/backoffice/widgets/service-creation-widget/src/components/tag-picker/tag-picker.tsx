import { Chip, Dropdown } from '@oxygen/ui-kit';
import * as S from './tag-picker.style';
import { CodeTitle } from '../../types';

type Props =
  | {
      isLoading: boolean;
      title: string;
      menu?: CodeTitle[];
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

const convert = (item: CodeTitle[] | undefined) => {
  return item?.map((tag) => ({ key: tag.code, label: tag.title, value: tag.code })) ?? [];
};

export default function TagPicker(props: Props) {
  const { title, onChange, value, menu, isLoading } = props;

  const handleChange = (items /* TODO: find a type for this */) => {
    if (onChange) onChange(items.map((item) => ({ code: item.value, title: item.label })));
  };

  const deleteItem = (item: CodeTitle) => {
    if (onChange) onChange(value.filter((selectedItem) => selectedItem.code !== item.code));
  };

  return (
    <S.TagPicker>
      <Dropdown.Select
        onChange={handleChange}
        value={convert(value)}
        multiSelect
        loading={isLoading}
        menu={convert(menu)}
      >
        {title}
      </Dropdown.Select>
      {value?.map((item) => (
        <Chip
          ellipsis
          closeIcon
          type='active'
          key={item.code}
          tooltipOnEllipsis
          tooltipTitle={item.title}
          onClose={() => deleteItem(item)}
        >
          {item.title}
        </Chip>
      ))}
    </S.TagPicker>
  );
}
