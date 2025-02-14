module.exports = {
  TASKCLUSTER_ROOT_URL: 'https://firefox-ci-tc.services.mozilla.com',
  TREEHERDER_URL: 'https://treeherder.mozilla.org',
  AUTH0: {
    domain: 'auth.mozilla.auth0.com',
    clientID: 'FK1mJkHhwjulTYBGklxn8W4Fhd1pgT4t',
    redirectUri: new URL('/login', window.location).href,
    scope: 'full-user-credentials openid profile email',
    responseType: 'token id_token',
    audience: 'https://auth.mozilla.auth0.com/api/v2/',
  },
  PRODUCTS: [
    {
      product: 'firefox',
      prettyName: 'Firefox Desktop',
      appName: 'browser',
      branches: [
        {
          prettyName: 'Try',
          project: 'try',
          branch: 'try',
          repo: 'https://hg.mozilla.org/try',
          enableReleaseEta: false,
          disableable: true,
        },
      ],
      enablePartials: true,
      canTogglePartials: true,
    },
    {
      product: 'devedition',
      prettyName: 'Firefox Developer Edition',
      appName: 'browser',
      branches: [
        {
          prettyName: 'Try',
          project: 'try',
          branch: 'try',
          repo: 'https://hg.mozilla.org/try',
          enableReleaseEta: false,
          disableable: true,
        },
      ],
      enablePartials: true,
      canTogglePartials: true,
    },
    {
      product: 'thunderbird',
      prettyName: 'Thunderbird',
      appName: 'mail',
      branches: [
        {
          prettyName: 'Try',
          project: 'try-comm-central',
          branch: 'try-comm-central',
          repo: 'https://hg.mozilla.org/try-comm-central',
          enableReleaseEta: false,
          disableable: false,
        },
      ],
      enablePartials: true,
      canTogglePartials: true,
    },
    {
      product: 'firefox-android',
      prettyName: 'Firefox Android (Android-Components, Fenix, Focus)',
      appName: 'firefox-android',
      branches: [
        {
          branch: '',
        },
      ],
      repositories: [
        {
          prettyName: 'Staging Android monorepo',
          project: 'staging-firefox-android',
          repo: 'https://github.com/mozilla-releng/staging-firefox-android',
          enableReleaseEta: false,
        },
      ],
      enablePartials: false,
    },
    {
      product: 'app-services',
      prettyName: 'Application Services',
      appName: 'app-services',
      branches: [
        {
          branch: '',
        },
      ],
      repositories: [
        {
          prettyName: 'Staging Application Services',
          project: 'app-services',
          repo:
            'https://github.com/mozilla-releng/staging-application-services',
          enableReleaseEta: false,
          enableTreeherder: false,
        },
      ],
      enablePartials: false,
    },
  ],
  XPI_MANIFEST: {
    branch: 'main',
    owner: 'mozilla-releng',
    project: 'staging-xpi-manifest',
    repo: 'https://github.com/mozilla-releng/staging-xpi-manifest',
  },
};
