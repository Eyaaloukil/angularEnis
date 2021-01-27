import { Component, OnInit } from '@angular/core';
import { MemberServiceService } from 'src/services/member-service.service';
import { Publication } from 'src/models/publication.model';
import { Router } from '@angular/router';
import { Member } from 'src/models/member.model';
import { DomSanitizer } from '@angular/platform-browser';
import { Outil } from 'src/models/outil.model';
@Component({
  selector: 'app-outils',
  templateUrl: './outils.component.html',
  styleUrls: ['./outils.component.css']
})
export class OutilsComponent implements OnInit {





    item: Member;
    base64Data:any;
    retrievedImage:any;


    dataSource: Outil[] = [];
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
      this.memberService.getAllOutils().then(data => this.dataSource = data);
    }
    addOutil(){
      this.router.navigateByUrl('/addOutil');
    }

    editOutil(id:string){
      this.router.navigateByUrl('/editOutil/'+id);
    }
    deleteOutil(idout:string){
      this.memberService.deleteOutilFromMember(idout,this.memberService.getDecodedAccessToken(this.memberService.getToken()).authorities[0].split("ROLE")[0]).subscribe(data => {

    });
    this.memberService.deleteOutilFromOutil(idout).subscribe(res => {

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
