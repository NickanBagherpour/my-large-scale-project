import { CodeTitle, Tags } from '../types';

export function convertTags(tags?: Tags) {
  return tags?.map((t) => ({ ...t, code: t.id })) ?? [];
}

export function convertCodeTitles(items?: CodeTitle[]) {
  return items?.map(({ code, title }) => ({ label: title, value: code })) ?? [];
}
