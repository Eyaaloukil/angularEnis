import { Component, OnInit } from '@angular/core';
import { MemberServiceService } from 'src/services/member-service.service';
import { Publication } from 'src/models/publication.model';
import { Router } from '@angular/router';
import { Member } from 'src/models/member.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit {
  item: Member;
  base64Data:any;
  retrievedImage:any;


  dataSource: Publication[] = [];
  constructor(private memberService:MemberServiceService,public router: Router,private sanitizer: DomSanitizer) { }


  isLoggedIn(){
    if(this.memberService.getToken()){
      return true    }


  return false; }


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
  }
  addPublication(){
    this.router.navigateByUrl('/addPublication');
  }
  deletePublication(idpub:string){
    this.memberService.deletePublicationFromMember(idpub,this.memberService.getDecodedAccessToken(this.memberService.getToken()).authorities[0].split("ROLE")[0]).subscribe(data => {

  });
  this.memberService.deletePublicationFromPublication(idpub).subscribe(res => {

   this.fetchDataSource();
   this.memberService.getMemberById(this.memberService.getDecodedAccessToken(this.memberService.getToken()).authorities[0].split("ROLE")[0]).then(item => {
    this.item = item;
    this.base64Data = item.photo;
    let image = 'data:image/jpeg;base64,' + this.base64Data;
    this.retrievedImage=this.sanitizer.bypassSecurityTrustUrl(image);
  });

  });
}

  editPublication(id:string){
    this.router.navigateByUrl('/editPublication/'+id);
  }
}
