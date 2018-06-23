defmodule Secretshopper.RecipeImportTest do
  use Secretshopper.DataCase

  alias Secretshopper.Recipe
  alias Secretshopper.RecipeImport

  test "can parse the vegan curry recipe" do
    val = RecipeImport.fetch("https://www.allrecipes.com/recipe/165190/spicy-vegan-potato-curry/")

    assert val == %{
             cook_time: "PT30M",
             prep_time: "PT30M",
             total_time: "PT1H",
             ingredients: [
               %{name: "4 potatoes, peeled and cubed"},
               %{name: "2 tablespoons vegetable oil"},
               %{name: "1 yellow onion, diced"},
               %{name: "3 cloves garlic, minced"},
               %{name: "2 teaspoons ground cumin"},
               %{name: "1 1/2 teaspoons cayenne pepper"},
               %{name: "4 teaspoons curry powder"},
               %{name: "4 teaspoons garam masala"},
               %{name: "1 (1 inch) piece fresh ginger root, peeled and minced"},
               %{name: "2 teaspoons salt"},
               %{name: "1 (14.5 ounce) can diced tomatoes"},
               %{name: "1 (15 ounce) can garbanzo beans (chickpeas), rinsed and drained"},
               %{name: "1 (15 ounce) can peas, drained"},
               %{name: "1 (14 ounce) can coconut milk"}
             ],
             instructions: [
               %{
                 text:
                   "Place potatoes into a large pot and cover with salted water. Bring to a boil over high heat, then reduce heat to medium-low, cover, and simmer until just tender, about 15 minutes. Drain and allow to steam dry for a minute or two."
               },
               %{
                 text:
                   "Meanwhile, heat the vegetable oil in a large skillet over medium heat. Stir in the onion and garlic; cook and stir until the onion has softened and turned translucent, about 5 minutes. Season with cumin, cayenne pepper, curry powder, garam masala, ginger, and salt; cook for 2 minutes more. Add the tomatoes, garbanzo beans, peas, and potatoes. Pour in the coconut milk, and bring to a simmer. Simmer 5 to 10 minutes before serving."
               }
             ]
           }

    assert {:ok, _} =
             Recipe.changeset(%Recipe{}, val)
             |> Repo.insert()
  end

  test "can parse Jay's Jerk Chicken" do
    val = RecipeImport.fetch("https://www.allrecipes.com/recipe/8667/jays-jerk-chicken/")

    assert val == %{
             cook_time: "PT30M",
             ingredients: [
               %{name: "6 green onions, chopped"},
               %{name: "1 onion, chopped"},
               %{name: "1 jalapeno pepper, seeded and minced"},
               %{name: "3/4 cup soy sauce"},
               %{name: "1/2 cup distilled white vinegar"},
               %{name: "1/4 cup vegetable oil"},
               %{name: "2 tablespoons brown sugar"},
               %{name: "1 tablespoon chopped fresh thyme"},
               %{name: "1/2 teaspoon ground cloves"},
               %{name: "1/2 teaspoon ground nutmeg"},
               %{name: "1/2 teaspoon ground allspice"},
               %{name: "1 1/2 pounds skinless, boneless chicken breast halves"}
             ],
             instructions: [
               %{
                 text:
                   "In a food processor or blender, combine the green onions, onion, jalapeno pepper, soy sauce, vinegar, vegetable oil, brown sugar, thyme, cloves, nutmeg and allspice. Mix for about 15 seconds."
               },
               %{
                 text:
                   "Place the chicken in a medium bowl, and coat with the marinade. Refrigerate for 4 to 6 hours, or overnight."
               },
               %{text: "Preheat grill for high heat."},
               %{
                 text:
                   "Lightly oil grill grate. Cook chicken on the prepared grill 6 to 8 minutes, until juices run clear."
               }
             ],
             prep_time: "PT15M",
             total_time: "PT4H45M"
           }

    assert {:ok, _} =
             Recipe.changeset(%Recipe{}, val)
             |> Repo.insert()
  end

  test "can parse chicken parm" do
    val = RecipeImport.fetch("https://www.allrecipes.com/recipe/223042/chicken-parmesan/")

    assert val == %{
             cook_time: "PT20M",
             ingredients: [
               %{name: "4 skinless, boneless chicken breast halves"},
               %{name: "salt and freshly ground black pepper to taste"},
               %{name: "2 eggs"},
               %{name: "1 cup panko bread crumbs, or more as needed"},
               %{name: "1/2 cup grated Parmesan cheese"},
               %{name: "2 tablespoons all-purpose flour, or more if needed"},
               %{name: "1 cup olive oil for frying"},
               %{name: "1/2 cup prepared tomato sauce"},
               %{name: "1/4 cup fresh mozzarella, cut into small cubes"},
               %{name: "1/4 cup chopped fresh basil"},
               %{name: "1/2 cup grated provolone cheese"},
               %{name: "1/4 cup grated Parmesan cheese"},
               %{name: "1 tablespoon olive oil"}
             ],
             instructions: [
               %{text: "Preheat an oven to 450 degrees F (230 degrees C)."},
               %{
                 text:
                   "Place chicken breasts between two sheets of heavy plastic (resealable freezer bags work well) on a solid, level surface. Firmly pound chicken with the smooth side of a meat mallet to a thickness of 1/2-inch. Season chicken thoroughly with salt and pepper."
               },
               %{text: "Beat eggs in a shallow bowl and set aside."},
               %{
                 text:
                   "Mix bread crumbs and 1/2 cup Parmesan cheese in a separate bowl, set aside."
               },
               %{
                 text:
                   "Place flour in a sifter or strainer; sprinkle over chicken breasts, evenly coating both sides."
               },
               %{
                 text:
                   "Dip flour coated chicken breast in beaten eggs. Transfer breast to breadcrumb mixture, pressing the crumbs into both sides. Repeat for each breast. Set aside breaded chicken breasts for about 15 minutes."
               },
               %{
                 text:
                   "Heat 1 cup olive oil in a large skillet on medium-high heat until it begins to shimmer. Cook chicken until golden, about 2 minutes on each side. The chicken will finish cooking in the oven."
               },
               %{
                 text:
                   "Place chicken in a baking dish and top each breast with about 1/3 cup of tomato sauce. Layer each chicken breast with equal amounts of mozzarella cheese, fresh basil, and provolone cheese. Sprinkle 1 to 2 tablespoons of Parmesan cheese on top and drizzle with 1 tablespoon olive oil."
               },
               %{
                 text:
                   "Bake in the preheated oven until cheese is browned and bubbly, and chicken breasts are no longer pink in the center, 15 to 20 minutes. An instant-read thermometer inserted into the center should read at least 165 degrees F (74 degrees C)."
               }
             ],
             prep_time: "PT25M",
             total_time: "PT1H"
           }

    assert {:ok, _} =
             Recipe.changeset(%Recipe{}, val)
             |> Repo.insert()
  end
end
