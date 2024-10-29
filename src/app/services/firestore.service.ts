import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Prenda {
  prenda: string;
  color: string;
  cantidad: number;
}

interface Pedido{
  equipo: string;
  dorsal: number;
  nombre: string;
  fecha: string;
  email: string;
}

interface Calzado {
  marca: string;
  modelo: string;
  talla: string;
  color: string;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private collectionName = 'prendas'; // Nombre de la colección en Firestore

  constructor(private firestore: AngularFirestore) { }

  // Método para agregar una,eliminar y actualizar una prenda
  agregarPrenda(prenda: Prenda): Promise<void> {
    const id = this.firestore.createId(); // Genera un ID único para el documento
    return this.firestore.collection(this.collectionName).doc(id).set(prenda);
  }

  eliminarPrenda(prendaId: string): Promise<void> {
    return this.firestore.collection<Prenda>(this.collectionName).doc(prendaId).delete();
  }
  
  actualizarPrenda(prendaId: string, prendaActualizada: Prenda): Promise<void> {
    return this.firestore.collection<Prenda>(this.collectionName)
      .doc(prendaId)
      .update(prendaActualizada);
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
}
private collectionName2 = 'pedidos'; // Nombre de la colección en Firestore

// Método para agregar una,eliminar y actualizar un pedido
agregarPedido(pedido: Pedido): Promise<void> {
  const id = this.firestore.createId(); // Genera un ID único para el documento
  return this.firestore.collection(this.collectionName2).doc(id).set(pedido);
}

eliminarPedido(pedidoId: string): Promise<void> {
  return this.firestore.collection<Pedido>(this.collectionName2).doc(pedidoId).delete();
}

actualizarPedido(pedidoId: string, pedidoActualizado: Pedido): Promise<void> {
  return this.firestore.collection<Pedido>(this.collectionName2)
    .doc(pedidoId)
    .update(pedidoActualizado);
}

// Método para obtener todas los pedidos 
obtenerPedidos(): Observable<Pedido[]> {
  return this.firestore.collection<Pedido>(this.collectionName2).snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data() as Pedido;
      const id = a.payload.doc.id;
      return { id, ...data };
    }))
  );
}

private collectionName3 = 'calzados'; // Nombre de la colección en Firestore

// Método para agregar una,eliminar y actualizar una prenda
agregarCalzado(calzado: Calzado): Promise<void> {
  const id = this.firestore.createId(); // Genera un ID único para el documento
  return this.firestore.collection(this.collectionName3).doc(id).set(calzado);
}

eliminarCalzado(calzadoId: string): Promise<void> {
  return this.firestore.collection<Calzado>(this.collectionName3).doc(calzadoId).delete();
}

actualizarCalzado(calzadoId: string, calzadoActualizado: Calzado): Promise<void> {
  return this.firestore.collection<Calzado>(this.collectionName3)
    .doc(calzadoId)
    .update(calzadoActualizado);
}

// Método para obtener todas las prendas 
obtenerCalzados(): Observable<Calzado[]> {
  return this.firestore.collection<Calzado>(this.collectionName3).snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data() as Calzado;
      const id = a.payload.doc.id;
      return { id, ...data };
    }))
  );
}
}