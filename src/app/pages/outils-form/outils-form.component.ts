import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Outil } from 'src/models/outil.model';
import { MemberServiceService } from 'src/services/member-service.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Member } from 'src/models/member.model';

@Component({
  selector: 'app-outils-form',
  templateUrl: './outils-form.component.html',
  styleUrls: ['./outils-form.component.css']
})
export class OutilsFormComponent implements OnInit {

  item: Member;
  model = {
    date: Date,
    sourcePdf: ''
  }
  base64Data:any;
  retrievedImage:any;
  dataSource: Outil[] = [];

  constructor(private memberService:MemberServiceService,public router: Router,private sanitizer: DomSanitizer) { }
  userDetails;
  ngOnInit() {
    this.memberService.getMemberById(this.memberService.getDecodedAccessToken(this.memberService.getToken()).authorities[0].split("ROLE")[0]).then(item => {
      this.item = item;
      this.base64Data = item.photo;
      let image = 'data:image/jpeg;base64,' + this.base64Data;
      this.retrievedImage=this.sanitizer.bypassSecurityTrustUrl(image);
    });
    this.memberService.getAllOutils().then(data => this.dataSource = data);

  }

  onSubmit(form: NgForm) {

    this.memberService.saveOutil(form.value).subscribe(
      res => {
        this.router.navigateByUrl('/confirmOutil');
      },
      err=>{
        console.log(err)
      }

    );


  }


}
