import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { MemberServiceService } from 'src/services/member-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Outil } from 'src/models/outil.model';
import { Member } from 'src/models/member.model';

@Component({
  selector: 'app-edit-outil',
  templateUrl: './edit-outil.component.html',
  styleUrls: ['./edit-outil.component.css']
})
export class EditOutilComponent implements OnInit {

  item: Member;
  outilDetails:Outil;
  model = {

    date: Date,

    sourcePdf: ''
  }
  base64Data:any;
  retrievedImage:any;


  constructor(private route: ActivatedRoute,private memberService:MemberServiceService,public router: Router,private sanitizer: DomSanitizer) { }
  userDetails;
  ngOnInit() {
    this.memberService.getMemberById(this.memberService.getDecodedAccessToken(this.memberService.getToken()).authorities[0].split("ROLE")[0]).then(item => {
      this.item = item;
      this.base64Data = item.photo;
      let image = 'data:image/jpeg;base64,' + this.base64Data;
      this.retrievedImage=this.sanitizer.bypassSecurityTrustUrl(image);
    });
    this.route.params.pipe(switchMap((params: Params) => {
      return  this.memberService.getOutilById(params['id']); }))
   .subscribe(outil => { this.outilDetails = outil;  })
  }


  onSubmit(form: NgForm) {

    this.memberService.editOutil(form.value,this.outilDetails.id).subscribe(
      res => {
        this.router.navigateByUrl('/outils');
      },
      err=>{
        console.log(err)
      }

    );


}
}
