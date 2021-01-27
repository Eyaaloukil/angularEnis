import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Member } from 'src/models/member.model';
import { MemberServiceService } from 'src/services/member-service.service';
import { switchMap } from 'rxjs/operators';
import { Publication } from 'src/models/publication.model';
@Component({
  selector: 'app-publication-edit',
  templateUrl: './publication-edit.component.html',
  styleUrls: ['./publication-edit.component.css']
})
export class PublicationEditComponent implements OnInit {
  item: Member;
  publicationsDetails:Publication;
  model = {
    titre: '',
    type: '',
    dateApparition: Date,
    lien: '',
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
      return  this.memberService.getPublicatiobById(params['id']); }))
   .subscribe(publication => { this.publicationsDetails = publication;  })
  }


  onSubmit(form: NgForm) {
    
    this.memberService.editPublication(form.value,this.publicationsDetails.id).subscribe(
      res => {
        this.router.navigateByUrl('/publications');
      },
      err=>{
        console.log(err)
      }

    );

  
}
}
