import React from 'react';
import { PageProps } from '@oxygen/types';
import FormContainer from '../formContainer/formContainer';

type AppProps = PageProps;

const App: React.FC<AppProps> = () => {
  return <FormContainer title={'ثبت نام در سامانه'}>hello</FormContainer>;
};

export default App;
