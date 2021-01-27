import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Evenement } from 'src/models/evenement.model';
import { Member } from 'src/models/member.model';
import { MemberServiceService } from 'src/services/member-service.service';

@Component({
  selector: 'app-evenements',
  templateUrl: './evenements.component.html',
  styleUrls: ['./evenements.component.css']
})
export class EvenementsComponent implements OnInit {

  item: Member;
  base64Data:any;
  retrievedImage:any;


  dataSource: Evenement[] = [];
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
    this.memberService.getAllEvenements().then(data => this.dataSource = data);
  }
  addEvenement(){
    this.router.navigateByUrl('/addEvenement');
  }

  editEvenement(id:string){
    this.router.navigateByUrl('/editEvenement/'+id);
  }
  Confirmer(id){
    this.memberService.confirmEvenement(this.memberService.getDecodedAccessToken(this.memberService.getToken()).authorities[0].split("ROLE")[0],id).subscribe(res => {

      this.fetchDataSource();
      this.memberService.getMemberById(this.memberService.getDecodedAccessToken(this.memberService.getToken()).authorities[0].split("ROLE")[0]).then(item => {
       this.item = item;
       this.base64Data = item.photo;
       let image = 'data:image/jpeg;base64,' + this.base64Data;
       this.retrievedImage=this.sanitizer.bypassSecurityTrustUrl(image);
     });

     });
  }
  deleteEvenement(idout:string){
    this.memberService.deleteEventFromMember(idout,this.memberService.getDecodedAccessToken(this.memberService.getToken()).authorities[0].split("ROLE")[0]).subscribe(data => {
      this.fetchDataSource();
      this.memberService.getMemberById(this.memberService.getDecodedAccessToken(this.memberService.getToken()).authorities[0].split("ROLE")[0]).then(item => {
       this.item = item;
       this.base64Data = item.photo;
       let image = 'data:image/jpeg;base64,' + this.base64Data;
       this.retrievedImage=this.sanitizer.bypassSecurityTrustUrl(image);
     });

  });

}
}
