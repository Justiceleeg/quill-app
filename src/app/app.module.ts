import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { WritePostComponent } from './write-post/write-post.component';
import { ViewPostsComponent } from './view-posts/view-posts.component';
import { SplashPageComponent } from './splash-page/splash-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ViewSinglePostComponent } from './view-single-post/view-single-post.component';
import { AppRoutingModule } from './app-routing.module';
import { WriteRedirectComponent } from './write-redirect/write-redirect.component';


@NgModule({
  declarations: [
    AppComponent,
    WritePostComponent,
    ViewPostsComponent,
    SplashPageComponent,
    ErrorPageComponent,
    ViewSinglePostComponent,
    WriteRedirectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule // Imported for routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {


}
