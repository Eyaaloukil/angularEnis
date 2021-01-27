import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberServiceService } from 'src/services/member-service.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Member } from 'src/models/member.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  item: Member;
  a;
  base64Data:any;
  retrievedImage:any;
  fileSelected?: File;
  base64: string = "";
  dataSource;
  imageUrl?: string;
  constructor(private route:ActivatedRoute,private sant:DomSanitizer,private memberService:MemberServiceService,public router: Router,private sanitizer: DomSanitizer) { }
  userDetails;
  ngOnInit() {

    this.route.params.pipe(switchMap((params: Params) => {
      return  this.memberService.getMemberById(params['id']); }))
   .subscribe(item => { this.item = item;
    this.base64Data = item.photo;
    let image = 'data:image/jpeg;base64,' + this.base64Data;
    this.retrievedImage=this.sanitizer.bypassSecurityTrustUrl(image);})




  }

}
