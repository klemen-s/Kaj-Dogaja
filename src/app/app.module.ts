import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import { PlacesComponent } from './places/places.component';
import { InputFormComponent } from './input-form/input-form.component';
import { PlaceComponent } from './place/place.component';
import { PlaceDetailComponent } from './place-detail/place-detail.component';
import { LoginComponent } from './login/login.component';
import { PostPlaceComponent } from './post-place/post-place.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WrapperComponent,
    PlacesComponent,
    InputFormComponent,
    PlaceComponent,
    PlaceDetailComponent,
    LoginComponent,
    PostPlaceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
