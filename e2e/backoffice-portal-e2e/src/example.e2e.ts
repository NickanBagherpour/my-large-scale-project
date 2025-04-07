import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect h1 to contain a substring.
  expect(await page.locator('h1').innerText()).toContain('Welcome');
});


export async function readCodeAndTicketFromURLE2E(page) {
  const targetUrl = 'http://uat.bo.oxygenpro.ir';
  const ssoUrlRegex = /sso\.oxygenpro\.ir/;
  const ssoUsernameSelector = 'input[id="username"]';
  const ssoPasswordSelector = 'input[id="password"]';
  const ssoSubmitSelector = 'button[name="login"]';
  const productionRedirectPrefixRegex = /uat\.bo\.oxygenpro\.ir\/client-list\?code=/;
  const localhostRedirectUrl = 'http://localhost:3000/auth';
  const codeParamName = 'code';
  const ticketParamName = 'ticket';
  const stateParamName = 'state';

  await page.goto(targetUrl);
  await page.getByRole('button', { name: 'ورود به سامانه' }).click();

  await page.fill(ssoUsernameSelector, 'nickan1991');
  await page.fill(ssoPasswordSelector, 'aA@123456');
  await page.getByRole('button', { name: 'ورود' }).click();

  let capturedCode: null | string = null;
  let capturedTicket: null | string = null;
  let capturedState: null | string = null;

  await page.route('**', async (route) => {
    const requestUrl = route.request().url();
    if (requestUrl.startsWith(targetUrl) && requestUrl.includes('?code=')) {
      const urlParts = new URL(requestUrl);
      capturedCode = urlParts.searchParams.get(codeParamName);
      capturedTicket = urlParts.searchParams.get(ticketParamName);
      capturedState = urlParts.searchParams.get(stateParamName);

      let redirectTarget = localhostRedirectUrl;
      const localhostURL = new URL(localhostRedirectUrl);

      if (capturedCode) {
        localhostURL.searchParams.append(codeParamName, capturedCode);
      }
      if (capturedState) {
        localhostURL.searchParams.append(stateParamName, capturedState);
      }
      if (capturedTicket) {
        localhostURL.searchParams.append(ticketParamName, capturedTicket);
      }

      redirectTarget = localhostURL.toString();

      await route.fulfill({ status: 302, headers: { Location: redirectTarget } });
    } else {
      await route.continue();
    }
  });

  await page.waitForURL('http://localhost:3000/client-list');
  await expect(page.locator('text=نیکان باقرپور')).toBeVisible();
}


test('client details test', async ({ page }) => {
  await readCodeAndTicketFromURLE2E(page);

});
