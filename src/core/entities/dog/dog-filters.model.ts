import { BreedGroup } from "src/core/enums/breed-groups.enum";

export interface DogFilters {
  name: string;
  breedGroup: BreedGroup;
}
