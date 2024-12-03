'use server';

import AuthWidget from '@oxygen/backoffice/widgets/auth-widget';

export default async function Index(props) {
  return <AuthWidget parentProps={props} />;
}
