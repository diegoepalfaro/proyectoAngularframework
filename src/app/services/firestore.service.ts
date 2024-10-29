import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Prenda {
  prenda: string;
  color: string;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private collectionName = 'prendas'; // Nombre de la colección en Firestore

  constructor(private firestore: AngularFirestore) { }

  // Método para agregar una prenda
  agregarPrenda(prenda: Prenda): Promise<void> {
    const id = this.firestore.createId(); // Genera un ID único para el documento
    return this.firestore.collection(this.collectionName).doc(id).set(prenda);
  }

  eliminarPrenda(prendaId: string): Promise<void> {
    return this.firestore.collection<Prenda>(this.collectionName).doc(prendaId).delete();
  }
  

  // Método para obtener todas las prendas 
  obtenerPrendas(): Observable<Prenda[]> {
    return this.firestore.collection<Prenda>(this.collectionName).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Prenda;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
}}