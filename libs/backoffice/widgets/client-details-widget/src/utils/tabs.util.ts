import { Tab } from '../types';

const validTabs: readonly Tab[] = ['plugins', 'services', 'client-info'];
const isTab = (maybeTab: string): maybeTab is Tab => validTabs.includes(maybeTab as Tab);

export const getValidTab = (maybeTab: string | null): Tab => {
  if (maybeTab && isTab(maybeTab)) return maybeTab;
  else return 'client-info';
};
