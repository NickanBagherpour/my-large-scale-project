import { UploadFile } from 'antd';

export function validString(str: string): boolean {
  return !!str.trim().length;
}

export function isExcel({ file }: { file: UploadFile }): boolean {
  const name = file?.name;
  if (!name) return false;

  const validExtensions = ['xls', 'xlsx'];
  const extension = name.split('.').at(-1);

  return !!extension && validExtensions.includes(extension);
}
