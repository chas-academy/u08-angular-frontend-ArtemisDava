import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    loadComponent: () =>
      import('./recipes/recipes.component').then((m) => m.RecipesComponent),
  },
  {
    path: 'recipe',
    loadComponent: () =>
      import('./recipe-detail/recipe-detail.component').then(
        (m) => m.RecipeDetailComponent
      ),
  },
  {
    path: 'add-recipe',
    loadComponent: () =>
      import('./add-recipe/add-recipe.component').then(
        (m) => m.AddRecipeComponent
      ),
  },
  {
    path: 'delete-recipe',
    loadComponent: () =>
      import('./delete-recipe/delete-recipe.component').then(
        (m) => m.DeleteRecipeComponent
      ),
  },
  {
    path: 'edit-recipe',
    loadComponent: () =>
      import('./edit-recipe/edit-recipe.component').then(
        (m) => m.RecipesEditComponent
      ),
  },
  {
    path: 'edit-form',
    loadComponent: () =>
      import('./edit-recipe/edit-form/edit-form.component').then(
        (m) => m.EditRecipeComponent
      ),
  },
  { path: '**', redirectTo: '/recipes' },
];
