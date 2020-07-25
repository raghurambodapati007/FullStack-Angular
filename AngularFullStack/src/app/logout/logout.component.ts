import { Component, OnInit } from '@angular/core';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  isLogout : boolean

  constructor(public hardCodedAuthentication : HardcodedAuthenticationService) { }

  ngOnInit(): void {
   this.hardCodedAuthentication.logout();
  }

}
