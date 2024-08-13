import { AccordionDetails, AccordionSummary, IconButton, AccordionProps as MuiAccordionProps } from '@mui/material';
import React, { ReactNode, useState } from 'react';

import { uuid } from '@oxygen-portal/utils';

import * as S from './accordion.style';

export type AccordionProps = MuiAccordionProps & {
  title?: ReactNode;
  showExpandIcon?: boolean;
  icon?: ReactNode;
};

const Accordion: React.FC<AccordionProps> = (props) => {
  const { children, id = uuid(), title, expanded: baseExpanded, onChange, showExpandIcon = true, ...rest } = props;
  const [expanded, setExpanded] = useState(props?.defaultExpanded ?? baseExpanded);

  const handleChange = (event: React.SyntheticEvent, expanded: boolean) => {
    setExpanded(expanded);
    if (onChange) {
      onChange(event, expanded);
    }
  };

  return (
    <S.Accordion expanded={expanded} onChange={handleChange} {...rest}>
      <AccordionSummary aria-controls={`${id}-content`} id={id}>
        <span className={'accordion-summary__icon'}>
          {props?.icon ? props?.icon : <i className={'icon-document-text'} />}
        </span>

        <span className={'accordion-summary__title'}>{title}</span>

        {showExpandIcon && (
          <IconButton className={'accordion-summary__expand-button'}>
            {expanded ? <i className={'icon-up-arrow'} /> : <i className={'icon-bottom-arrow'} />}
          </IconButton>
        )}
      </AccordionSummary>

      <AccordionDetails>{children}</AccordionDetails>
    </S.Accordion>
  );
};

export default Accordion;
