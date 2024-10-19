import React, { ReactNode } from 'react';

import { ScrollToTop } from '../../index';

export type StepItemType = {
  id?: any;
  component?: ReactNode;
};

type PageStepperProps = {
  steps?: StepItemType[];
  active?: StepItemType['id'];
};

const PageStepper = ({ steps, active }: PageStepperProps) => {
  return (
    <>
      {steps?.map((step) => (
        <React.Fragment key={step.id}>
          {step.id === active && (
            <>
              <ScrollToTop />
              {step.component}
            </>
          )}
        </React.Fragment>
      ))}
    </>
  );
};

export default PageStepper;
