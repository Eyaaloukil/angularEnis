import { Component, OnInit } from '@angular/core';
import { Member } from 'src/models/member.model';
import { Outil } from 'src/models/outil.model';
import { MemberServiceService } from 'src/services/member-service.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-confirm-outil',
  templateUrl: './confirm-outil.component.html',
  styleUrls: ['./confirm-outil.component.css']
})
export class ConfirmOutilComponent implements OnInit {
  item: Member;
  base64Data:any;
  retrievedImage:any;
publication:Outil;

  dataSource: Outil[] = [];
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
    this.memberService.getAllOutils().then(data => this.dataSource = data);
    this.publication=this.dataSource[this.dataSource.length-1];
  }
  Confirmer(){
    this.memberService.confirmOutil(this.memberService.getDecodedAccessToken(this.memberService.getToken()).authorities[0].split("ROLE")[0],this.dataSource[this.dataSource.length-1].id).subscribe(
      res => {


        this.router.navigate(['outils']);


      },
      err => {

      }
    )
  }
  Annuler(){

  }
}
