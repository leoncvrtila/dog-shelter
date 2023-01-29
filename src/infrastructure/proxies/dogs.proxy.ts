import { DogsOutput } from "./models/dogs.model";
import { http } from "./services/http.service";

export class DogProxy {
  async getDogs() {
    const { data } = await http.get<DogsOutput[]>(
      "https://api.thedogapi.com/v1/breeds?limit=10&page=0"
    );
    return data;
  }
}

export const userRolesProxy = new DogProxy();
