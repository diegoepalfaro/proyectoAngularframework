import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';

interface Calzado {
  id?: string;
  marca: string;
  modelo: string;
  talla: string;
  color: string;
  cantidad: number;
}

@Component({
  selector: 'app-tabla-calzado',
  templateUrl: './tabla-calzado.component.html',
  styleUrls: ['./tabla-calzado.component.scss']
})
export class TablaCalzadoComponent implements OnInit {
  calzados: Calzado[] = [];
  nuevoCalzado: Calzado = { marca: '',modelo:'',talla:'', color: '', cantidad: 0 };
  editIndex3: number | null = null;

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit(): void {
  
    this.firestoreService.obtenerCalzados().subscribe((calzados) => {
      this.calzados = calzados;
    });
  }

  agregarCalzado() {
    if (this.nuevoCalzado.marca && this.nuevoCalzado.color && this.nuevoCalzado.cantidad > 0) {
      if (this.editIndex3 !== null) {
        this.calzados[this.editIndex3] = { ...this.nuevoCalzado };
        this.editIndex3 = null;
      } else {
        // Añadir la calzado a la tabla local y a Firestore
        this.calzados.push({ ...this.nuevoCalzado });

        this.firestoreService.agregarCalzado(this.nuevoCalzado)
          .then(() => {
            console.log('Calzado añadida a Firestore');
          })
          .catch((error) => {
            console.error('Error al añadir calzado a Firestore:', error);
          });
      }
      this.nuevoCalzado = { marca: '',modelo:'',talla:'', color: '', cantidad: 0 };
    }
  }

  editarCalzado(index: number) {
    const calzadoAEditar = this.calzados[index];
    this.nuevoCalzado = { ...calzadoAEditar };
    this.editIndex3 = index;
  }

  actualizarCalzado() {
    if (this.editIndex3 !== null) {
      const calzadoaActualizar = this.calzados[this.editIndex3];
  
      if (calzadoaActualizar.id) {
        this.firestoreService.actualizarCalzado(calzadoaActualizar.id, this.nuevoCalzado)
          .then(() => {
            console.log('Calzado actualizada en Firestore y en la tabla');
          })
          .catch(error => {
            console.error('Error al actualizar calzado en Firestore:', error);
          });
      } else {
        console.error('No se encontró el ID del documento para actualizar.');
      }
    }
  }

  eliminarCalzado(index: number) {
    const calzadoAEliminar = this.calzados[index];
    if (calzadoAEliminar.id) { 
      this.firestoreService.eliminarCalzado(calzadoAEliminar.id)
        .then(() => {

          console.log('Calzado eliminada de Firestore y de la tabla');
        })
        .catch((error) => {
          console.error('Error al eliminar calzado de Firestore:', error);
        });
    } else {
      console.error('No se encontró el ID del documento para eliminar.');
    }
  }
  
  
}
