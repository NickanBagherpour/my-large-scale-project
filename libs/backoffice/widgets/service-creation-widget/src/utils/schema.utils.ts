import { UploadFile } from 'antd';

export function validString(str: string): boolean {
  return !!str.trim().length;
}

export function isExcel(data: { file: UploadFile } | null): boolean {
  const name = data?.file.name;
  if (!name) return false;

  const validExtensions = ['xls', 'xlsx'];
  const extension = name.split('.').at(-1);

  return !!extension && validExtensions.includes(extension);
}
