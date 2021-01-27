import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router'
import { MemberServiceService } from 'src/services/member-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  serverErrorMessages: string;
  showSuccessMessage: boolean;
  constructor(public memberService: MemberServiceService, public router: Router) { }
  model = {
    email: '',
    password: ''
  }
  error:string;
  ngOnInit(): void {
  }
  onSubmit(form: NgForm) {
    this.memberService.login(form.value).subscribe(
      res => {
        this.memberService.setToken(res['Authorization'])
        this.router.navigateByUrl('/dashboard');
      },
      err=>{
        this.error="Verifier votre email et mot de passe"
      }

    );

  }
}
