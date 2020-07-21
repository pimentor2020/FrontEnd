import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User } from './_models';
/*import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  LinkedinLoginProvider
} from 'angularx-social-login';
@NgModule({
    imports: [ SocialLoginModule ],
    providers: [
      {
        provide: 'SocialAuthServiceConfig',
        useValue: {
          autoLogin: false,
          providers: [
            {
              id: LinkedinLoginProvider.PROVIDER_ID,
              provider: new LinkedinLoginProvider(
                'clientId'
              ),
            }
          ],
        } as SocialAuthServiceConfig,
      }
    ]
  })*/

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}