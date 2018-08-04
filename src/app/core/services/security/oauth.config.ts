import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from '../../../../environments/environment';

export const oauthConfig: AuthConfig = {
  clientId: environment.oauth.clientId,
  issuer: 'https://federate-qa.volvo.com',
  loginUrl: `${environment.oauth.url}/as/authorization.oauth2`,
  logoutUrl: `${environment.oauth.url}/idp/startSLO.ping?TargetResource=${encodeURIComponent(window.location.origin)}`,
  redirectUri: `${window.location.origin}${environment.hostContext}/authorise.html`,
  customQueryParams: {
    display: 'page'
  }
};
