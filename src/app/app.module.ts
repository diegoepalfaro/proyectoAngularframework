import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { TablaInventarioComponent } from './tabla-inventario/tabla-inventario.component';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
@NgModule({
  declarations: [
    AppComponent,
    TablaInventarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), // Inicializar Firebase
    AngularFirestoreModule,

  ],
  providers: [
    provideClientHydration(),
    provideFirebaseApp(() => initializeApp({"projectId":"gdi-ropa-app","appId":"1:1025237086112:web:4c194818008aa5cf8c7ec5","storageBucket":"gdi-ropa-app.appspot.com","apiKey":"AIzaSyBQKCDTcowV1MaSBRJp6N-M04z3NHf5IAE","authDomain":"gdi-ropa-app.firebaseapp.com","messagingSenderId":"1025237086112"})),
    provideFirestore(() => getFirestore())
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
