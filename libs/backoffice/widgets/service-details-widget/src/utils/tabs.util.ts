import { Tab } from '../types';

const validTabs: readonly Tab[] = ['general-information', 'route', 'scopes', 'upstream'];
const isTab = (maybeTab: string): maybeTab is Tab => validTabs.includes(maybeTab as Tab);

export const getValidTab = (maybeTab: string | null): Tab => {
  if (maybeTab && isTab(maybeTab)) return maybeTab;
  else return 'general-information';
};
