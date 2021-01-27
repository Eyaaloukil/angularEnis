import { Component, OnInit } from '@angular/core';
import { MemberServiceService } from 'src/services/member-service.service';
import { Member } from 'src/models/member.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  item: Member;
  a;
  base64Data:any;
  retrievedImage:any;
  fileSelected?: File;
  base64: string = "";
  dataSource;
  imageUrl?: string;
  constructor(private sant:DomSanitizer,private memberService:MemberServiceService,public router: Router,private sanitizer: DomSanitizer) { }
  userDetails;
  ngOnInit() {
    if(this.memberService.getToken()){
    this.memberService.getMemberById(this.memberService.getDecodedAccessToken(this.memberService.getToken()).authorities[0].split("ROLE")[0]).then(item => {
      this.item = item;
      this.base64Data = item.photo;
      let image = 'data:image/jpeg;base64,' + this.base64Data;
      this.retrievedImage=this.sanitizer.bypassSecurityTrustUrl(image);
    });
  }
    else{
      this.router.navigate(['dashboard']);
    }

    this.memberService.findEnseignants().then(data => this.dataSource = data);



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
    if (this.base64==""){
      this.a=this.item.photo
    }
    else{
      this.a=this.base64.split("base64,")[1]
    }
    let body = {
      email: this.item.email,
      password: this.item.password,
      cv:this.item.cv,
      dateNaissance:this.item.dateNaissance,
      nom:this.item.nom,
      prenom:this.item.prenom,
      cin:this.item.cin,
      diplome:this.item.diplome,
      sujet:this.item.sujet,

      photo: this.a,
        };
if(this.memberService.getDecodedAccessToken(this.memberService.getToken()).authorities[0].split("ROLE_ROLE")[1]=="_Etudiant"){
  this.memberService.updateEtudiant(this.memberService.getDecodedAccessToken(this.memberService.getToken()).authorities[0].split("ROLE")[0],body).subscribe(
    res => {

      this.memberService.getMemberById(this.memberService.getDecodedAccessToken(this.memberService.getToken()).authorities[0].split("ROLE")[0]).then(item => {
        this.item = item;
        this.base64Data = item.photo;
        let image = 'data:image/jpeg;base64,' + this.base64Data;
        this.retrievedImage=this.sanitizer.bypassSecurityTrustUrl(image);
      });


    },
    err => {



    }
  )
  if(form.value.encadrant){
  this.memberService.affectEncadrant(this.memberService.getDecodedAccessToken(this.memberService.getToken()).authorities[0].split("ROLE")[0],form.value.encadrant)
  .subscribe(
      res => {



      },
      err => {



      }
    );

    }

  }
    else if(this.memberService.getDecodedAccessToken(this.memberService.getToken()).authorities[0].split("ROLE_ROLE")[1]=="_Enseignant"){
      this.memberService.updateEnseignant(this.memberService.getDecodedAccessToken(this.memberService.getToken()).authorities[0].split("ROLE")[0], form.value).subscribe(
        res => {


          window.location.reload();


        },
        err => {



        }
      )}

  }

}
