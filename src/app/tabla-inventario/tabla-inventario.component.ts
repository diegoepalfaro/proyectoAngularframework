import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';

interface Prenda {
  id?: string;
  prenda: string;
  
  cantidad: number;
}

@Component({
  selector: 'app-tabla-inventario',
  templateUrl: './tabla-inventario.component.html',
  styleUrls: ['./tabla-inventario.component.scss']
})
export class TablaInventarioComponent implements OnInit {
  prendas: Prenda[] = [];
  nuevaPrenda: Prenda = { prenda: '', cantidad: 0 };
  editIndex: number | null = null;

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit(): void {
    // Llama a obtenerPrendas y suscríbete para actualizar la lista de prendas
    this.firestoreService.obtenerPrendas().subscribe((prendas) => {
      this.prendas = prendas;
    });
  }

  agregarPrenda() {
    if (this.nuevaPrenda.prenda && this.nuevaPrenda.cantidad > 0) {
      if (this.editIndex !== null) {
        this.prendas[this.editIndex] = { ...this.nuevaPrenda };
        this.editIndex = null;
      } else {
        // Añadir la prenda a la tabla local y a Firestore
        this.prendas.push({ ...this.nuevaPrenda });

        this.firestoreService.agregarPrenda(this.nuevaPrenda)
          .then(() => {
            console.log('Prenda añadida a Firestore');
          })
          .catch((error) => {
            console.error('Error al añadir prenda a Firestore:', error);
          });
      }
      this.nuevaPrenda = { prenda: '', cantidad: 0 };
    }
  }

  editarPrenda(index: number) {
    const prendaAEditar = this.prendas[index];
    this.nuevaPrenda = { ...prendaAEditar };
    this.editIndex = index;
  }

  actualizarPrenda() {
    if (this.editIndex !== null) {
      const prendaaActualizar = this.prendas[this.editIndex];
  
      if (prendaaActualizar.id) {
        this.firestoreService.actualizarPrenda(prendaaActualizar.id, this.nuevaPrenda)
          .then(() => {
            // Actualizar en la tabla local
           /* this.prendas[this.editIndex!] = { id: prendaaActualizar.id, ...this.nuevaPrenda }; // Usa `!` para indicar que no es null
            this.editIndex = null;
            this.nuevaPrenda = { prenda: '', color: '', cantidad: 0 };*/
            console.log('Prenda actualizada en Firestore y en la tabla');
          })
          .catch(error => {
            console.error('Error al actualizar prenda en Firestore:', error);
          });
      } else {
        console.error('No se encontró el ID del documento para actualizar.');
      }
    }
  }

  eliminarPrenda(index: number) {
    const prendaAEliminar = this.prendas[index];
    if (prendaAEliminar.id) { 
      this.firestoreService.eliminarPrenda(prendaAEliminar.id)
        .then(() => {
          // Elimina de la tabla después de eliminar de Firestore
          //this.prendas.splice(index, 1);
          console.log('Prenda eliminada de Firestore y de la tabla');
        })
        .catch((error) => {
          console.error('Error al eliminar prenda de Firestore:', error);
        });
    } else {
      console.error('No se encontró el ID del documento para eliminar.');
    }
  }
  
  
}
