import { CodeTitle, Tags } from '../types';

export function convertTags(tags?: Tags) {
  return tags?.map((tag) => ({ key: tag.id, label: tag.title, value: tag.id })) ?? [];
}

export function convertCodeTitles(items?: CodeTitle[]) {
  return items?.map(({ code, title }) => ({ label: title, value: code })) ?? [];
}
