defmodule Secretshopper.RecipeImportTest do
  use Secretshopper.DataCase

  alias Secretshopper.RecipeImport

  test "can parse the vegan curry recipe" do
    val = RecipeImport.fetch("https://www.allrecipes.com/recipe/165190/spicy-vegan-potato-curry/")

    assert val == %{
             cookTime: "PT30M",
             prepTime: "PT30M",
             totalTime: "PT1H",
             ingredients: [
               "4 potatoes, peeled and cubed",
               "2 tablespoons vegetable oil",
               "1 yellow onion, diced",
               "3 cloves garlic, minced",
               "2 teaspoons ground cumin",
               "1 1/2 teaspoons cayenne pepper",
               "4 teaspoons curry powder",
               "4 teaspoons garam masala",
               "1 (1 inch) piece fresh ginger root, peeled and minced",
               "2 teaspoons salt",
               "1 (14.5 ounce) can diced tomatoes",
               "1 (15 ounce) can garbanzo beans (chickpeas), rinsed and drained",
               "1 (15 ounce) can peas, drained",
               "1 (14 ounce) can coconut milk"
             ],
             instructions: [
               "Place potatoes into a large pot and cover with salted water. Bring to a boil over high heat, then reduce heat to medium-low, cover, and simmer until just tender, about 15 minutes. Drain and allow to steam dry for a minute or two.",
               "Meanwhile, heat the vegetable oil in a large skillet over medium heat. Stir in the onion and garlic; cook and stir until the onion has softened and turned translucent, about 5 minutes. Season with cumin, cayenne pepper, curry powder, garam masala, ginger, and salt; cook for 2 minutes more. Add the tomatoes, garbanzo beans, peas, and potatoes. Pour in the coconut milk, and bring to a simmer. Simmer 5 to 10 minutes before serving."
             ]
           }
  end

  test "can parse Jay's Jerk Chicken" do
    val = RecipeImport.fetch("https://www.allrecipes.com/recipe/8667/jays-jerk-chicken/")

    assert val == %{
             cookTime: "PT30M",
             ingredients: [
               "6 green onions, chopped",
               "1 onion, chopped",
               "1 jalapeno pepper, seeded and minced",
               "3/4 cup soy sauce",
               "1/2 cup distilled white vinegar",
               "1/4 cup vegetable oil",
               "2 tablespoons brown sugar",
               "1 tablespoon chopped fresh thyme",
               "1/2 teaspoon ground cloves",
               "1/2 teaspoon ground nutmeg",
               "1/2 teaspoon ground allspice",
               "1 1/2 pounds skinless, boneless chicken breast halves"
             ],
             instructions: [
               "In a food processor or blender, combine the green onions, onion, jalapeno pepper, soy sauce, vinegar, vegetable oil, brown sugar, thyme, cloves, nutmeg and allspice. Mix for about 15 seconds.",
               "Place the chicken in a medium bowl, and coat with the marinade. Refrigerate for 4 to 6 hours, or overnight.",
               "Preheat grill for high heat.",
               "Lightly oil grill grate. Cook chicken on the prepared grill 6 to 8 minutes, until juices run clear."
             ],
             prepTime: "PT15M",
             totalTime: "PT4H45M"
           }
  end

  test "can parse chicken parm" do
    val = RecipeImport.fetch("https://www.allrecipes.com/recipe/223042/chicken-parmesan/")

    assert val == %{
             cookTime: "PT20M",
             ingredients: [
               "4 skinless, boneless chicken breast halves",
               "salt and freshly ground black pepper to taste",
               "2 eggs",
               "1 cup panko bread crumbs, or more as needed",
               "1/2 cup grated Parmesan cheese",
               "2 tablespoons all-purpose flour, or more if needed",
               "1 cup olive oil for frying",
               "1/2 cup prepared tomato sauce",
               "1/4 cup fresh mozzarella, cut into small cubes",
               "1/4 cup chopped fresh basil",
               "1/2 cup grated provolone cheese",
               "1/4 cup grated Parmesan cheese",
               "1 tablespoon olive oil"
             ],
             instructions: [
               "Preheat an oven to 450 degrees F (230 degrees C).",
               "Place chicken breasts between two sheets of heavy plastic (resealable freezer bags work well) on a solid, level surface. Firmly pound chicken with the smooth side of a meat mallet to a thickness of 1/2-inch. Season chicken thoroughly with salt and pepper.",
               "Beat eggs in a shallow bowl and set aside.",
               "Mix bread crumbs and 1/2 cup Parmesan cheese in a separate bowl, set aside.",
               "Place flour in a sifter or strainer; sprinkle over chicken breasts, evenly coating both sides.",
               "Dip flour coated chicken breast in beaten eggs. Transfer breast to breadcrumb mixture, pressing the crumbs into both sides. Repeat for each breast. Set aside breaded chicken breasts for about 15 minutes.",
               "Heat 1 cup olive oil in a large skillet on medium-high heat until it begins to shimmer. Cook chicken until golden, about 2 minutes on each side. The chicken will finish cooking in the oven.",
               "Place chicken in a baking dish and top each breast with about 1/3 cup of tomato sauce. Layer each chicken breast with equal amounts of mozzarella cheese, fresh basil, and provolone cheese. Sprinkle 1 to 2 tablespoons of Parmesan cheese on top and drizzle with 1 tablespoon olive oil.",
               "Bake in the preheated oven until cheese is browned and bubbly, and chicken breasts are no longer pink in the center, 15 to 20 minutes. An instant-read thermometer inserted into the center should read at least 165 degrees F (74 degrees C)."
             ],
             prepTime: "PT25M",
             totalTime: "PT1H"
           }
  end
end
