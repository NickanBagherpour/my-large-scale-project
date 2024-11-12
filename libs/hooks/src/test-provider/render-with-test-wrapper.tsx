import { render } from '@testing-library/react';

import TestProvider from './test-provider';

// Custom render function to include TestWrapper
export const renderWithTestWrapper = (ui: React.ReactElement) => {
  return render(ui, { wrapper: TestProvider });
};
