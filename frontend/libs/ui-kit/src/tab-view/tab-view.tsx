import {Box as MuiBox, BoxProps as MuiBoxProps, styled, Tab} from '@mui/material';
import React from 'react';
import {TabContext as MuiTabContext,TabContextProps as MuiTabContextProps, TabList, TabPanel} from "@mui/lab";

export type TabViewProps = MuiTabContextProps & {
    //
};

const StyledTabContext = styled(MuiTabContext)<any>``;

const TabView: React.FC<TabViewProps> = (props) => {
    const {children, ...rest} = props;

    return (
        <StyledTabContext {...rest}>
       {/*     <TabList onChange={handleChange} aria-label="operations tabs">
                <Tab label={t("display_detail")} value={OperationTabs.ACCOUNT_DETAIL}
                     icon={<i className='icon-remove-red-eye'/>} iconPosition="start"/>
                <Tab label={t("update_iban")} value={OperationTabs.UPDATE_IBAN}
                     icon={<i className='icon-update'/>} iconPosition="start"/>
            </TabList>*/}

            {/*<TabPanel value={OperationTabs.ACCOUNT_DETAIL}>Item One</TabPanel>*/}
            {/*<TabPanel value={OperationTabs.UPDATE_IBAN}>Item Two</TabPanel>*/}
            {children}
        </StyledTabContext>
    );
};

export default TabView;
