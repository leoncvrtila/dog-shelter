export interface DogsOutput {
  id: number;
  name: string;
  weight: {
    imperial: string;
    metric: string;
  };
  height: {
    imperial: string;
    metric: string;
  };
  image: {
    url: string;
    id: string;
    height: number;
    width: number;
  };
  bred_for: string;
  breed_group: string;
  life_span: string;
  origin: string;
  reference_image_id: string;
  temperament: string;
}

export interface CreateDogInput {
  id: number;
  name: string;
  weight: {
    imperial: string;
    metric: string;
  };
  height: {
    imperial: string;
    metric: string;
  };
  image: {
    url: string;
    id: string;
    height: number;
    width: number;
  };
  bred_for: string;
  breed_group: string;
  life_span: string;
  origin: string;
  reference_image_id: string;
  temperament: string;
}

export interface UpdateDogInput {
  id: number;
  name: string;
  weight: {
    imperial: string;
    metric: string;
  };
  height: {
    imperial: string;
    metric: string;
  };
  image: {
    url: string;
    id: string;
    height: number;
    width: number;
  };
  bred_for: string;
  breed_group: string;
  life_span: string;
  origin: string;
  reference_image_id: string;
  temperament: string;
}
