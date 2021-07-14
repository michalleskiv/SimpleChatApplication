import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/data-types/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

    user: User = {};
    authenticated = false;
    registered = false;

    constructor(private authenticationService: AuthenticationService) { }

    ngOnInit(): void {
    }

    login() {
        this.authenticated = this.authenticationService.authenticate(this.user);
    }

    register() {
        this.authenticationService.register(this.user).subscribe(() => {
            this.registered = true;
        })
    }

}
