import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Evenement } from 'src/models/evenement.model';
import { Member } from 'src/models/member.model';
import { MemberServiceService } from 'src/services/member-service.service';

@Component({
  selector: 'app-edit-evenement',
  templateUrl: './edit-evenement.component.html',
  styleUrls: ['./edit-evenement.component.css']
})
export class EditEvenementComponent implements OnInit {


  item: Member;
  evenementDetails:Evenement;
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
      return  this.memberService.getEvenementById(params['id']); }))
   .subscribe(evenement => { this.evenementDetails = evenement;  })
  }


  onSubmit(form: NgForm) {

    this.memberService.editEvenement(form.value,this.evenementDetails.id).subscribe(
      res => {
        this.router.navigateByUrl('/evenements');
      },
      err=>{
        console.log(err)
      }

    );


}
}
