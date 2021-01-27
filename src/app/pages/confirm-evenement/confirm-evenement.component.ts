import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Evenement } from 'src/models/evenement.model';
import { Member } from 'src/models/member.model';
import { MemberServiceService } from 'src/services/member-service.service';

@Component({
  selector: 'app-confirm-evenement',
  templateUrl: './confirm-evenement.component.html',
  styleUrls: ['./confirm-evenement.component.css']
})
export class ConfirmEvenementComponent implements OnInit {

  item: Member;
  base64Data:any;
  retrievedImage:any;
publication:Evenement;

  dataSource: Evenement[] = [];
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
    this.memberService.getAllEvenements().then(data => this.dataSource = data);
    this.publication=this.dataSource[this.dataSource.length-1];
  }
  Confirmer(){
    this.memberService.confirmEvenement(this.memberService.getDecodedAccessToken(this.memberService.getToken()).authorities[0].split("ROLE")[0],this.dataSource[this.dataSource.length-1].id).subscribe(
      res => {


        this.router.navigate(['evenement']);


      },
      err => {

      }
    )
  }
  Annuler(){

  }

}
