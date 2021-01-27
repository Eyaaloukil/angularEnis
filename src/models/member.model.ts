import { Publication } from "./publication.model";

export interface Member {
  id: string,
  cin: string,
  nom: string,
  prenom: string,
  dateNaissance: string,
  cv: string,
email:string,
password:string,
diplome:string,
sujet:string,
photo:string,
pubs:Publication[],
encadrant:Member


}
