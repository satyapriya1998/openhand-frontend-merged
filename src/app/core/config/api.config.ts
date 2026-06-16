import { InjectionToken }
from '@angular/core';

import { environment }
from '../../../environments/environment';

export const API_GATEWAY =
  new InjectionToken<string>(
    'API_GATEWAY',
    {
      providedIn: 'root',

      factory: () =>
        environment.api.gateway,
    }
  );