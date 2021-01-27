import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Member } from 'src/models/member.model';
import { Publication } from 'src/models/publication.model';
import { MemberServiceService } from 'src/services/member-service.service';

@Component({
  selector: 'app-publication-form',
  templateUrl: './publication-form.component.html',
  styleUrls: ['./publication-form.component.css']
})
export class PublicationFormComponent implements OnInit {
  item: Member;
  model = {
    titre: '',
    type: '',
    dateApparition: Date,
    lien: '',
    sourcePdf: ''
  }
  base64Data:any;
  retrievedImage:any;
  dataSource: Publication[] = [];

  constructor(private memberService:MemberServiceService,public router: Router,private sanitizer: DomSanitizer) { }
  userDetails;
  ngOnInit() {
    this.memberService.getMemberById(this.memberService.getDecodedAccessToken(this.memberService.getToken()).authorities[0].split("ROLE")[0]).then(item => {
      this.item = item;
      this.base64Data = item.photo;
      let image = 'data:image/jpeg;base64,' + this.base64Data;
      this.retrievedImage=this.sanitizer.bypassSecurityTrustUrl(image);
    });
    this.memberService.getAllPublications().then(data => this.dataSource = data);

  }

  onSubmit(form: NgForm) {
    
    this.memberService.savePublication(form.value).subscribe(
      res => {
        this.router.navigateByUrl('/confirmPublication');
      },
      err=>{
        console.log(err)
      }

    );
    

  }

}
