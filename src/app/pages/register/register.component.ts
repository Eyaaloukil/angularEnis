import { Component, OnInit } from '@angular/core';
import { MemberServiceService } from 'src/services/member-service.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { abort } from 'process';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  readerEvt:any;
  constructor(private sant: DomSanitizer,public memberService: MemberServiceService, public router: Router) { }
  model = {
    email: '',
    password: '',
    cv:'',
    dateNaissance:Date,
    nom:'',
    prenom:'',
    cin:'',
    type:'',
    photo:Blob
  }
  fileSelected?: File;
  base64: string = "";

  imageUrl?: string;


  ngOnInit(): void {
  }
  onSelectNewFile(elemnt:HTMLInputElement): void {
    if(elemnt.files?.length==0)return;
    this.fileSelected = (elemnt.files as FileList)[0] ;
    this.imageUrl = this.sant.bypassSecurityTrustUrl(window.URL.createObjectURL(this.fileSelected)) as string;
    this.base64 = "Base64...";
    let reader = new FileReader();
    reader.readAsDataURL(this.fileSelected as Blob);
    reader.onloadend = () => {
      this.base64 = reader.result as string;
    }
  }

  onSubmit(form: NgForm) {



let body = {
  email: this.model.email,
  password: this.model.password,
  cv:this.model.cv,
  dateNaissance:this.model.dateNaissance,
  nom:this.model.nom,
  prenom:this.model.prenom,
  cin:this.model.cin,
  type:this.model.type,
  photo: this.base64.split("base64,")[1]
    };


  if(this.model.type=="Etudiant"){

    this.memberService.saveEtudiant(body).subscribe(
      res => {
        this.router.navigateByUrl('/user-profile');
        console.log(this.model)
      },
      err=>{
        console.log(err)
      }

    );}
    else if(this.model.type=="Enseignant"){
      this.memberService.saveEnseignant(body).subscribe(
        res => {
          this.router.navigateByUrl('/user-profile');
        },
        err=>{
          console.log(err)
        }

      );}

  }
}
