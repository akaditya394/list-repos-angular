import { Component } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  username: string = '';
  repositories: any[] = [];
  loading: boolean = false;
  pageSize: number = 10;
  currentPage: number = 1;

  constructor(private apiService: ApiService) {}

  search() {
    this.loading = true;
    this.currentPage = 1; // Reset current page when searching
    this.loadRepositories();
  }

  loadRepositories() {
    this.apiService
      .getRepositories(this.username, this.currentPage, this.pageSize)
      .subscribe((data: any[]) => {
        this.repositories = data;
        this.loading = false;
      });
  }

  nextPage() {
    this.currentPage++;
    this.loadRepositories();
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadRepositories();
    }
  }

  onPageSizeChange(event: any) {
    const pageSize = event.target.value;
    this.pageSize = parseInt(pageSize, 10); // Parse the value as an integer
    this.loadRepositories();
  }
}
