// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiUrl: 'http://testmanager-test.got.volvo.net/tm-uiservice/api/v1',
  host: 'http://localhost:8080',
  hostContext: '',
  oauth: {
    url: 'https://federate-qa.volvo.com',
    clientId: 'tm-uiservice'
  },
  env: 'local'
};
