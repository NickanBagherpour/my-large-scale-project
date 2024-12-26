'use server';

import AuthWidget from '@oxygen/business/widgets/auth-widget';

export default async function Index(props) {
  return <AuthWidget parentProps={props} />;
}
