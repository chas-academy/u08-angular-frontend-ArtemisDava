import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RecipesComponent } from './recipes/recipes.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { } 