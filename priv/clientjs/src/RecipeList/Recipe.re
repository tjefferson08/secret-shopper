type t = {
  id: int,
  name: string,
  cook_time: string,
  prep_time: string,
  total_time: string,
  favorited: bool,
  image_url: string,
  ingredients: array(Ingredient.t),
  instructions: array(Instruction.t),
};
