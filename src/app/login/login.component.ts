import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '@app/_services';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { first } from 'rxjs/operators';


@Component({ templateUrl: 'login.component.html' })
@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [LoginComponent]
})

export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    signUpForm: FormGroup;

    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    
    errorMessage = 'Invalid Credentials';
    successMessage: string;
    invalidLogin = false;
    loginSuccess = false;
    
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) { 
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }
        this.loginForm = new FormGroup({
            firstName: new FormControl()
         });
        
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get l() { return this.loginForm.controls; }
    get s() { return this.signUpForm.controls; }
    
    onLogin() {
        this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        console.log(this.l.username.value);

       this.authenticationService.login(this.l.username.value, this.l.password.value).pipe(first())
        .subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
            },
            error => {
                this.error = error;
                this.loading = false;
            });
}

    onSignUp() {
        this.submitted = true;

        if (this.signUpForm.invalid) {
            return;
        }

        this.loading = true;
        console.log(this.s.username.value);

    }

}
