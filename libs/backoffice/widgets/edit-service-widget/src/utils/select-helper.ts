import { ServiceEnum } from '../types/service-enum.type';
import { TagType } from '../types/tags.type';

export interface SelectOptionType {
  label: string;
  value: number;
  key: number;
}
export interface CodeTitle {
  code: number;
  title: string;
}
export const convertEnum = (list?: CodeTitle[]): SelectOptionType[] => {
  if (!list || !list.length) return [];
  return list.map((l) => convertToOption(l));
};
export const convertTags = (list?: TagType[]): SelectOptionType[] => {
  if (!list || !list.length) return [];
  return list.map((l) => ({
    label: l.title,
    value: l.id,
    key: l.id,
  }));
};
export const findInOptions = (options: SelectOptionType[], val: string | number) => {
  if (val != null && val.toString().trim() != '') {
    const option = options.find((o) => o.value === Number(val));
    if (option) {
      return {
        code: option.value,
        title: option.label,
      };
    }
  } else return null;
};
export const convertToCodeTitle = (option: SelectOptionType) => {
  return {
    code: option.value,
    title: option.label,
  };
};
export const convertToOption = (obj: CodeTitle): SelectOptionType => {
  return {
    label: obj.title,
    value: obj.code,
    key: obj.code,
  };
};
