import { TestBed } from '@angular/core/testing';

import { ReponseRequeteService } from './reponse-requete.service';

describe('ReponseRequeteService', () => {
  let service: ReponseRequeteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReponseRequeteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
