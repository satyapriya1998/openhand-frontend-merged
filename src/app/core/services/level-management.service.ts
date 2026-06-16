import { Injectable, inject } from '@angular/core';

import { LevelsService, LevelsDto } from '../api/organization';

@Injectable({
  providedIn: 'root',
})
export class LevelManagementService {
  private readonly levelService = inject(LevelsService);

  loadLevels() {
    return this.levelService.apiLevelsGetAllLevelsGet();
  }

  createLevel(payload: LevelsDto) {
    return this.levelService.apiLevelsCreatelevelsPost(payload);
  }

  updateLevel(id: string, payload: LevelsDto) {
    return this.levelService.apiLevelsIdPut(id, payload);
  }

  deleteLevel(id: string) {
    return this.levelService.apiLevelsIdDelete(id);
  }

  getLevelById(id: string) {
    return this.levelService.apiLevelsIdGet(id);
  }
}
