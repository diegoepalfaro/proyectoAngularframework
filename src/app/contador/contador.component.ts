import { Component } from '@angular/core';
import { Prenda } from '../prenda';
@Component({
  selector: 'app-contador',
  templateUrl: './contador.component.html',
  styleUrl: './contador.component.scss'
})
export class ContadorComponent {

  prenda:Prenda = {
    tipo: "camisa",
    cantidad: 15,
    colores: 'roja'
  }

}
