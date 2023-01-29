import { Model } from "pinia-orm";

export class Dog extends Model {
  static entity = "dogs";

  static primaryKey = "id";

  static fields() {
    return {
      id: this.number(0),
      name: this.string(""),
      weight: this.attr({
        imperial: "",
        metric: "",
      }),
      height: this.attr({
        imperial: "",
        metric: "",
      }),
      image: this.attr({
        url: "",
        id: "",
        height: 0,
        width: 0,
      }),
      bred_for: this.string(""),
      breed_group: this.string(""),
      life_span: this.string(""),
      origin: this.string(""),
      reference_image_id: this.string(""),
      temperament: this.string(""),
    };
  }
}
