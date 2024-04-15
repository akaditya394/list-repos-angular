import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle 404 error from API call', () => {
    const username = 'nonexistentuser';
    const page = 1;
    const pageSize = 10;

    service.getRepositories(username, page, pageSize).subscribe(
      (repos) => expect(repos.length).toBe(0),
      (error) => expect(error.status).toBe(404)
    );

    const req = httpMock.expectOne(
      `https://api.github.com/users/${username}/repos?page=${page}&per_page=${pageSize}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(null, { status: 404, statusText: 'Not Found' });
  });

  it('should handle other error statuses from API call', () => {
    const username = 'testuser';
    const page = 1;
    const pageSize = 10;

    service.getRepositories(username, page, pageSize).subscribe(
      (repos) => expect(repos.length).toBe(0),
      (error) => expect(error.status).toBe(500)
    );

    const req = httpMock.expectOne(
      `https://api.github.com/users/${username}/repos?page=${page}&per_page=${pageSize}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(null, { status: 500, statusText: 'Internal Server Error' });
  });

  it('should handle edge case of negative page number', () => {
    const username = 'testuser';
    const page = -1;
    const pageSize = 10;

    service.getRepositories(username, page, pageSize).subscribe((repos) => {
      expect(repos.length).toBe(0);
    });

    const req = httpMock.expectNone(
      `https://api.github.com/users/${username}/repos?page=${page}&per_page=${pageSize}`
    );
  });

  it('should handle edge case of zero page size', () => {
    const username = 'testuser';
    const page = 1;
    const pageSize = 0;

    service.getRepositories(username, page, pageSize).subscribe((repos) => {
      expect(repos.length).toBe(0);
    });

    const req = httpMock.expectNone(
      `https://api.github.com/users/${username}/repos?page=${page}&per_page=${pageSize}`
    );
  });
});
