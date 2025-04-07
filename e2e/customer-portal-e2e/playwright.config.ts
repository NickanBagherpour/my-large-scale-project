import { defineConfig, devices } from '@playwright/test';
import { nxE2EPreset } from '@nx/playwright/preset';
import { workspaceRoot } from '@nx/devkit';
import { join } from 'path';

// For CI, you may want to set BASE_URL to the deployed application.
const baseURL = process.env['BASE_URL'] || 'http://localhost:3000';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  ...nxE2EPreset(__filename),
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  testDir: workspaceRoot,
  testMatch: [
    // Include tests from the e2e project itself
    join(__dirname, 'src/**/*.e2e.{ts,tsx}'),

    // // Include tests from app-specific libraries
    join(workspaceRoot, 'libs/**/*.e2e.{ts,tsx}'),
    //
    // // Include tests from shared libraries that are used by this app
    // join(workspaceRoot, "libs/ui-kit/**/*.e2e.{ts,tsx}"),
    // join(workspaceRoot, "libs/hooks/**/*.e2e.{ts,tsx}"),
    // join(workspaceRoot, "libs/translations/**/*.e2e.{ts,tsx}"),
    // join(workspaceRoot, "libs/types/**/*.e2e.{ts,tsx}"),
    // join(workspaceRoot, "libs/client/**/*.e2e.{ts,tsx}"),
    // join(workspaceRoot, "libs/utils/**/*.e2e.{ts,tsx}"),
  ],

  // Explicitly exclude tests related to other apps
  testIgnore: [
    // Exclude tests specifically for other apps
    join(workspaceRoot, 'libs/backoffice/**/*.e2e.{ts,tsx}'),
    join(workspaceRoot, 'libs/business/**/*.e2e.{ts,tsx}'),
  ],

  use: {
    baseURL,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npx nx run customer-portal:start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    cwd: workspaceRoot,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // Uncomment for mobile browsers support
    /* {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    }, */

    // Uncomment for branded browsers
    /* {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    } */
  ],
});
