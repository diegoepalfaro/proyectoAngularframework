// src/app/services/email.service.ts
import { Injectable } from '@angular/core';
import emailjs from 'emailjs-com';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private userId = 'l5yDrHpjbM-sSr4R0';
  private serviceId = 'service_553ufyk';
  private templateId = 'template_plp356r';

  constructor() {
    emailjs.init(this.userId);
  }

  enviarEmail(data: { nombre: string;equipo:string; fecha: string; dorsal: number; to_email: string }) {
    return emailjs.send(this.serviceId, this.templateId, data);
  }
}
