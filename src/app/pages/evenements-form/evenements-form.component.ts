import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Evenement } from 'src/models/evenement.model';
import { Member } from 'src/models/member.model';
import { MemberServiceService } from 'src/services/member-service.service';

@Component({
  selector: 'app-evenements-form',
  templateUrl: './evenements-form.component.html',
  styleUrls: ['./evenements-form.component.css']
})
export class EvenementsFormComponent implements OnInit {


  item: Member;
  model = {
    titre:'',
    date: Date,
    lieu: ''
  }
  base64Data:any;
  retrievedImage:any;
  dataSource: Evenement[] = [];

  constructor(private memberService:MemberServiceService,public router: Router,private sanitizer: DomSanitizer) { }
  userDetails;
  ngOnInit() {
    this.memberService.getMemberById(this.memberService.getDecodedAccessToken(this.memberService.getToken()).authorities[0].split("ROLE")[0]).then(item => {
      this.item = item;
      this.base64Data = item.photo;
      let image = 'data:image/jpeg;base64,' + this.base64Data;
      this.retrievedImage=this.sanitizer.bypassSecurityTrustUrl(image);
    });
    this.memberService.getAllEvenements().then(data => this.dataSource = data);

  }

  onSubmit(form: NgForm) {

    this.memberService.saveEvenement(form.value).subscribe(
      res => {
        this.router.navigateByUrl('/confirmEvenement');
      },
      err=>{
        console.log(err)
      }

    );


  }

}
