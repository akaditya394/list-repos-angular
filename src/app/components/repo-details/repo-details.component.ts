import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-repo-details',
  templateUrl: './repo-details.component.html',
  styleUrls: ['./repo-details.component.scss'],
})
export class RepoDetailsComponent {
  @Input() repo: any;
  @Input() isLoading: boolean = false;
}
