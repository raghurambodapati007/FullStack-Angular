import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WelcomeDataService } from '../service/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  message = 'Some welcome message'
  welcomeMessageFromService: string
  LoginName = ''

  constructor(private route: ActivatedRoute, public welcomeService: WelcomeDataService) { }

  ngOnInit(): void {

    this.LoginName = this.route.snapshot.params['name'];

  }

      getWelcomeMessage() {

        this.welcomeService.executeHelloWorldBeanService().subscribe(
          response => this.handleSuccessfulResponse(response),
          error => this.handleErrorResponse(error)
        );
      }

      getPathVariableWelcomeMessage() {

        this.welcomeService.executeHelloWorldServiceWithPathVariable(this.LoginName).subscribe(
          response => this.handleSuccessfulResponse(response),
          error => this.handleErrorResponse(error)
        );

      }

      handleSuccessfulResponse(response) {
        this.welcomeMessageFromService = response.message
      }

      handleErrorResponse(error) {
          this.welcomeMessageFromService=error.error.message
      }
}
 