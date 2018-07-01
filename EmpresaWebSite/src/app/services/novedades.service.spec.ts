import { TestBed, inject } from '@angular/core/testing';

import { NovedadesService } from './novedades.service';

describe('NovedadesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NovedadesService]
    });
  });

  it('should be created', inject([NovedadesService], (service: NovedadesService) => {
    expect(service).toBeTruthy();
  }));
});
