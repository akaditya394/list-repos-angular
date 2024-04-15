import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { RepoDetailsComponent } from './components/repo-details/repo-details.component'; // Import ApiService here

@NgModule({
  declarations: [AppComponent, RepoDetailsComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [ApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
