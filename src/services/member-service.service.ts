import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Member } from 'src/models/member.model';
import { Publication } from 'src/models/publication.model';

import jwt_decode from 'jwt-decode';
import { Outil } from 'src/models/outil.model';
import { Evenement } from 'src/models/evenement.model';
@Injectable({
  providedIn: 'root'
})
export class MemberServiceService {
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' ,    'Access-Control-Allow-Origin':'*'
}) };
  public placeholderMembers: Member[];
  public placeholderPublications: Publication[];

  constructor(

    private httpClient: HttpClient,
  ) {
  }
  login(authCredentials) {
    return this.httpClient.post('http://localhost:9100/auth', authCredentials, this.noAuthHeader);
  }
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }
  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }
  deleteToken() {
    localStorage.removeItem('token');
  }
  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return true;
    else
      return false;
  }
  getAllMembers(): Promise<Member[]> {
    return this.httpClient.get<Member[]>('http://localhost:9999/membre-service/membres').toPromise();
  }

  getMemberById(id: string): Promise<Member> {
    return this.httpClient.get<Member>('http://localhost:9999/membre-service/fullmember/'+id).toPromise();


 }
  /**
   * create a new member or update an old member.
   * a new member doesn't have an id
   */
  saveEtudiant(member: any) {
    return this.httpClient.post<Member>('http://localhost:9999/membre-service/membres/etudiant/', member);

  }
  savePublication(publication: any) {
    return this.httpClient.post<Publication>('http://localhost:9999/publication-service/publications/publication/', publication);

  }
  saveOutil(outil: any) {
    return this.httpClient.post<Outil>('http://localhost:9999/outils-service/outils/outil/', outil);

  }
  saveEvenement(Evenement: any) {
    return this.httpClient.post<Evenement>('http://localhost:9999/evenement-service/evenements/evenement/', Evenement);

  }
  saveEnseignant(member: any) {
    return this.httpClient.post<Member>('http://localhost:9999/membre-service/membres/enseignant/', member);

  }
  removeMemberById(id: string): Promise<void> {
     return this.httpClient.delete<void>('http://localhost:9999/membre-service/members/member/'+id).toPromise();

  }
  getAllPublications(): Promise<Publication[]> {
    return this.httpClient.get<Publication[]>('http://localhost:9999/publication-service/publications/all').toPromise();
  }
  getAllOutils(): Promise<Outil[]> {
    return this.httpClient.get<Outil[]>('http://localhost:9999/outils-service/outils/').toPromise();
  }
  getAllEvenements(): Promise<Evenement[]> {
    return this.httpClient.get<Evenement[]>('http://localhost:9999/evenement-service/evenement/').toPromise();
  }
  updateEtudiant(id:string,member:any){
    return this.httpClient.put<Member>('http://localhost:9999/membre-service/membres/etudiant/'+id, member);

  }
  editPublication(publication:any,id:string){
    return this.httpClient.put<Publication>('http://localhost:9999/publication-service/publications/publication/'+id, publication);
  }
  editOutil(outil:any,id:string){
    return this.httpClient.put<Outil>('http://localhost:9999/outils-service/outils/'+id, outil);
  }
  editEvenement(Evenement:any,id:string){
    return this.httpClient.put<Evenement>('http://localhost:9999/evenement-service/evenement/'+id, Evenement);
  }
  updateEnseignant(id:string,member:any){
    return this.httpClient.put<Member>('http://localhost:9999/membre-service/membres/enseignant/'+id, member);
  }
  confirmPub(idMem:string,idPub:string){
    let params = new HttpParams();
    params = params.append('idetd', idMem);
    params = params.append('idpub', idPub);
    return this.httpClient.put<Member>('http://localhost:9999/membre-service/membres/publication?idetd='+idMem+'&idpub='+idPub,{});
  }
  confirmOutil(idMem:string,idOut:string){
    let params = new HttpParams();
    params = params.append('idetd', idMem);
    params = params.append('idpub', idOut);
    return this.httpClient.put<Member>('http://localhost:9999/membre-service/membres/outil?idMembre='+idMem+'&idOutil='+idOut,{});
  }
  confirmEvenement(idMem:string,idEve:string){
    let params = new HttpParams();
    params = params.append('idetd', idMem);
    params = params.append('idpub', idEve);
    return this.httpClient.put<Member>('http://localhost:9999/membre-service/membres/evenement?idetd='+idMem+'&ideve='+idEve,{});
  }
  findEnseignants(){
    return this.httpClient.get<Member[]>('http://localhost:9999/membre-service/enseignantChercheurs').toPromise();

  }
  deletePublication(idpub:string,idaut:string){
    return this.httpClient.delete<Publication>('http://localhost:9999/publication-service/publications/publication/'+idpub)
  }
  affectEncadrant(idetd:string,idens:string){
    return this.httpClient.put<Member>('http://localhost:9999/membre-service/membres/etudiant?idetd='+idetd+'&idens='+idens,{})
  }
  getPublicatiobById(id:string){
    return this.httpClient.get<Publication>('http://localhost:9999/publication-service/publications/'+id);
  }
  getOutilById(id:string){
    return this.httpClient.get<Outil>('http://localhost:9999/outils-service/outils/'+id);
  }
  getEvenementById(id:string){
    return this.httpClient.get<Evenement>('http://localhost:9999/evenement-service/evenement/'+id);
  }
  deletePublicationFromPublication(idpub:string){
    return this.httpClient.delete<Publication>('http://localhost:9999/publication-service/publications/publication/'+idpub)

  }
  deletePublicationFromMember(idpub:string,idaut:string){
    return this.httpClient.delete<Publication>('http://localhost:9999/membre-service/members/pub?idpub='+idpub+'&idaut='+idaut)

  }
  deleteOutilFromOutil(idout:string){
    return this.httpClient.delete<Outil>('http://localhost:9999/outils-service/outils/'+idout)

  }
  deleteOutilFromMember(idout:string,idaut:string){
    return this.httpClient.delete<Outil>('http://localhost:9999/membre-service/members/out?idout='+idout+'&idaut='+idaut)

  }
  deleteEventFromEvent(idout:string){
    return this.httpClient.delete<Event>('http://localhost:9999/evenement-service/evenement/'+idout)

  }
  deleteEventFromMember(idout:string,idaut:string){
    return this.httpClient.delete<Event>('http://localhost:9999/membre-service/members/eve?ideve='+idout+'&idaut='+idaut)

  }

}
