import { Environment } from '@my-app/core/environment.service';

export const environment: Environment = {
  production: false,
  appUrl: 'http://localhost:4200',
  appBaseHref: '/',
  apiUrl: 'http://localhost:5230',
  defaultLanguage: 'fr-FR',
  authUrl: 'http://localhost:8080',
  authRealm: 'myApp',
  authClientId: 'myApp-front',
};
