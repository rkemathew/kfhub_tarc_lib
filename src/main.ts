import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { KFTarcAppModule } from './app/kftarc.app.module';
// import { environmentReader } from './environments/environment';
import { environmentReader } from 'kfhub_lib';

environmentReader.then(environment => {
    if (environment["production"]) {
        enableProdMode();
    }

    platformBrowserDynamic().bootstrapModule(KFTarcAppModule)
        .catch(err => console.log(err));
});
