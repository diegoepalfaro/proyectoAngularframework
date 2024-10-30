import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { EmailService } from '../services/email.service';

interface Pedido {
  id?: string;
  equipo: string;
  dorsal: number;
  nombre: string;
  fecha: string;
  email: string;
}

@Component({
  selector: 'app-tabla-pedidos',
  templateUrl: './tabla-pedidos.component.html',
  styleUrls: ['./tabla-pedidos.component.scss']
})
export class TablaPedidosComponent implements OnInit {
  pedidos: Pedido[] = [];
  nuevoPedido: Pedido = { equipo: '', dorsal: 0, nombre: '',fecha:'',email: '' };
  editIndex2: number | null = null;

  constructor(private firestoreService: FirestoreService,
    private emailService: EmailService
  ) {}

  ngOnInit(): void {
    // Llama a obtenerPrendas y suscríbete para actualizar la lista de prendas
    this.firestoreService.obtenerPedidos().subscribe((pedidos) => {
      this.pedidos = pedidos;
    });
  }

  agregarPedido() {
    if (this.nuevoPedido.equipo && this.nuevoPedido.dorsal>0 && this.nuevoPedido.nombre && this.nuevoPedido.email) {
      if (this.editIndex2 !== null) {
        this.pedidos[this.editIndex2] = { ...this.nuevoPedido };
        this.editIndex2 = null;
      } else {
        // Añadir pedido a Firestore
        this.pedidos.push({ ...this.nuevoPedido });

        this.firestoreService.agregarPedido(this.nuevoPedido)
          .then(() => {
            console.log('Pedido añadido a Firestore');
          })
          .catch((error) => {
            console.error('Error al añadir pedido a Firestore:', error);
          });
      }
      this.nuevoPedido = { equipo: '', dorsal: 0, nombre: '',fecha: '',email: '' };
    }
  }

  actualizarPedido() {
    if (this.editIndex2 !== null) {
      const pedidoaActualizar = this.pedidos[this.editIndex2];
  
      if (pedidoaActualizar.id) {
        this.firestoreService.actualizarPedido(pedidoaActualizar.id, this.nuevoPedido)
          .then(() => {
            console.log('Pedido actualizado en Firestore y en la tabla');
          })
          .catch(error => {
            console.error('Error al actualizar pedido en Firestore:', error);
          });
      } else {
        console.error('No se encontró el ID del pedido para actualizar.');
      }
    }
  }

  editarPedido(index2: number) {
    const pedidoAEditar = this.pedidos[index2];
    this.nuevoPedido = { ...pedidoAEditar };
    this.editIndex2 = index2;
  }

  eliminarPedido(index: number) {
    const pedidoAEliminar = this.pedidos[index];
    if (pedidoAEliminar.id) { 
      this.firestoreService.eliminarPedido(pedidoAEliminar.id)
        .then(() => {
          console.log('Pedido eliminado de Firestore y de la tabla');
        })
        .catch((error) => {
          console.error('Error al eliminar pedido de Firestore:', error);
        });
    } else {
      console.error('No se encontró el ID del documento para eliminar.');
    }
  }
  
  enviarCorreo(index: number) {
    const pedido = this.pedidos[index];
    const data = {
      equipo: pedido.equipo,
      dorsal: pedido.dorsal,
      nombre: pedido.nombre,
      fecha: pedido.fecha,
      to_email: pedido.email
    };

    this.emailService.enviarEmail(data)
      .then(() => {
        console.log('Correo enviado con éxito');
      })
      .catch((error) => {
        console.error('Error al enviar correo:', error);
      });
  
}}
