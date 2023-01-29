import { defineStore } from "pinia";
import { useRepo } from "pinia-orm";
import { userRolesProxy } from "src/infrastructure/proxies/dogs.proxy";
import { Dog } from "../entities/dog/dog.model";
import { BreedGroup } from "../enums/breed-groups.enum";

const useDogRepo = useRepo(Dog);

export const useDogService = defineStore("dog-manager", {
  state: () => ({
    loading: false,
    filtersDog: {
      name: '',
      breedGroup: BreedGroup.All,
    },
  }),
  actions: {
    async getDogs() {
      this.loading = true;

      try {
        const dogs = await userRolesProxy.getDogs();
        useDogRepo.save(dogs);
      } catch (error: any) {
        throw new Error(error);
      }

      this.loading = true;
    },
    updateDog(dog: any) {
      useDogRepo.save(dog);
    },
    deleteDog(dogId: string) {
      useDogRepo.destroy(dogId);
    },
  },
  getters: {
    dogs: (state) => {
      return useDogRepo.all();
    },
  },
});
