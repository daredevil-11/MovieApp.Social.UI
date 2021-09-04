import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: true,
  application: {
    baseUrl,
    name: 'movieapp-social-ui',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44320',
    redirectUri: baseUrl,
    clientId: 'MovieApp_UI',
    responseType: 'code',
    scope: 'offline_access MovieApp',
    requireHttps: true
  },
  apis: {
    default: {
      url: 'https://localhost:44320',
      rootNamespace: 'Movie.App',
    },
  },
} as Environment;
