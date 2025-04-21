import type { FilterDropdownProps } from 'antd/es/table/interface';
import * as S from './filter-dropdown.style';

export const getDropdown = (props: FilterDropdownProps) => <Dropdown {...props} />;

export const Dropdown = ({ setSelectedKeys, selectedKeys, confirm, filters }: FilterDropdownProps) => {
  return (
    <S.Dropdown>
      {filters?.map((filter, idx) => (
        <li key={idx}>
          <S.FilterBtn
            variant='text'
            color='primary'
            $active={selectedKeys.includes(filter.value as React.Key)}
            onClick={() => {
              setSelectedKeys([filter.value as React.Key]);
              confirm();
            }}
          >
            {filter.text}
          </S.FilterBtn>
        </li>
      ))}
    </S.Dropdown>
  );
};

export const FilterIcon = () => <S.ChevIcon className='icon-chev-down' />;
