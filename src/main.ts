import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

export function prodAPI() {
  return environment.production;
}

export function devAPI() {
  return environment.api_url;
}

const providers = [
  { provide: 'API_URL', useFactory: devAPI, deps: [] },
];





platformBrowserDynamic(providers).bootstrapModule(AppModule)
  .catch(err => console.error(err));
