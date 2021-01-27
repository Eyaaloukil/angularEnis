import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from 'src/models/member.model';
import { Publication } from 'src/models/publication.model';
import { MemberServiceService } from 'src/services/member-service.service';

@Component({
  selector: 'app-confirm-pub',
  templateUrl: './confirm-pub.component.html',
  styleUrls: ['./confirm-pub.component.css']
})
export class ConfirmPubComponent implements OnInit {
  item: Member;
  base64Data:any;
  retrievedImage:any;
publication:Publication;

  dataSource: Publication[] = [];
  constructor(private memberService:MemberServiceService,public router: Router,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.fetchDataSource();
    this.memberService.getMemberById(this.memberService.getDecodedAccessToken(this.memberService.getToken()).authorities[0].split("ROLE")[0]).then(item => {
      this.item = item;
      this.base64Data = item.photo;
      let image = 'data:image/jpeg;base64,' + this.base64Data;
      this.retrievedImage=this.sanitizer.bypassSecurityTrustUrl(image);

    });
  }

  private fetchDataSource(): void {
    this.memberService.getAllPublications().then(data => this.dataSource = data);
    this.publication=this.dataSource[this.dataSource.length-1];
  }
  Confirmer(){
    this.memberService.confirmPub(this.memberService.getDecodedAccessToken(this.memberService.getToken()).authorities[0].split("ROLE")[0],this.dataSource[this.dataSource.length-1].id).subscribe(
      res => {


        this.router.navigate(['publications']);


      },
      err => {

      }
    )
  }
  Annuler(){

  }
}
