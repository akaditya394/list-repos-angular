import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { throwError, of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let apiService: ApiService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AppComponent],
      providers: [ApiService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should handle 404 error from API call', () => {
    spyOn(apiService, 'getRepositories').and.returnValue(
      throwError({ status: 404 })
    );
    component.username = 'nonexistentuser';
    component.search();
    expect(component.loading).toBe(false);
    expect(component.repositories.length).toBe(0);
  });

  it('should handle other error statuses from API call', () => {
    spyOn(apiService, 'getRepositories').and.returnValue(
      throwError({ status: 500, message: 'Internal Server Error' })
    );
    component.username = 'testuser';
    component.search();
    expect(component.loading).toBe(false);
    expect(component.repositories.length).toBe(0);
  });

  it('should handle edge case of negative page number', () => {
    spyOn(apiService, 'getRepositories').and.returnValue(of([]));
    component.currentPage = -1;
    component.search();
    expect(component.currentPage).toBe(1);
  });

  it('should handle edge case of zero page size', () => {
    spyOn(apiService, 'getRepositories').and.returnValue(of([]));
    component.pageSize = 0;
    component.search();
    expect(component.pageSize).toBe(1);
  });

  it('should handle edge case of large page size', () => {
    spyOn(apiService, 'getRepositories').and.returnValue(of([]));
    component.pageSize = 101;
    component.search();
    expect(component.pageSize).toBe(100);
  });
});
