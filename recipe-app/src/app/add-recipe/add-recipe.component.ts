import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface Ingredient {
  ingredient: string;
  quantity: number;
  unit: string;
}

interface Recipe {
  name: string;
  image: string;
  category: string;
  ingredients: Ingredient[];
  instructions: string[];
}

interface error {
  success: boolean;
  error: string;
}
interface ApiResponse {
  error: error[];
  success: boolean;
  data: Recipe | Recipe[];
}

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.scss',
})
export class AddRecipeComponent {
  recipes: Recipe[] = [];
  showAll: boolean = false;
  readonly API_URL =
    'https://express-api-jbkl.onrender.com/api/v1/admin/recipes';
  recipeInstructions: { id: number; text: string }[] = [{ id: 1, text: '' }];
  validUnits = [
    '',
    'tsp',
    'tbsp',
    'cups',
    'ml',
    'L',
    'fl oz',
    'pt',
    'qt',
    'gal',
    'g',
    'kg',
    'oz',
    'lb',
    'ea',
    'pcs',
    'in',
    'cm',
    'min',
    'hr',
    '°C',
    '°F',
  ];

  categories: any[] = [];

  getCategories() {
    const categories_url =
      'https://express-api-jbkl.onrender.com/api/v1/categories';
    this.http.get<{ data: any[] }>(categories_url).subscribe({
      next: (response) => {
        this.categories = response.data;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      },
    });
  }

  ngOnInit() {
    this.getCategories();
    this.getIngredients();
  }

  ingredients: any[] = [];
  getIngredients() {
    const ingredient_api_url =
      'https://express-api-jbkl.onrender.com/api/v1/ingredients';
    this.http.get<{ data: any[] }>(ingredient_api_url).subscribe({
      next: (response) => {
        this.ingredients = response.data;
      },
      error: (err) => {
        console.error('Error fetching ingredients:', err);
      },
    });
  }

  recipe: Recipe = {
    name: '',
    image: '',
    category: '',
    ingredients: [],
    instructions: [''],
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {}

  addIngredient() {
    this.recipe.ingredients.push({
      ingredient: '',
      quantity: 0,
      unit: '',
    });
  }

  removeIngredient(index: number) {
    this.recipe.ingredients.splice(index, 1);
  }

  addInstruction() {
    const newId =
      this.recipeInstructions.length > 0
        ? Math.max(...this.recipeInstructions.map((i) => i.id)) + 1
        : 1;
    this.recipeInstructions.push({ id: newId, text: '' });
    this.cdRef.detectChanges();
  }
  removeInstruction(index: number) {
    this.recipeInstructions.splice(index, 1);
    this.cdRef.detectChanges();
  }
  trackByInstructionId(
    index: number,
    instruction: { id: number; text: string }
  ) {
    return instruction.id;
  }
  prepareForSubmit() {
    this.recipe.instructions = this.recipeInstructions.map((i) => i.text);
  }

  onSubmit() {
    console.log('Recipe to submit:', this.recipe);
    this.prepareForSubmit();
    this.http.post<ApiResponse>(this.API_URL, this.recipe).subscribe({
      next: (response) => {
        if (response.success) {
          if (Array.isArray(response.data)) {
            this.recipes.push(...response.data);
          } else {
            this.recipes.push(response.data);
          }
          alert('Recipe added successfully!');
          this.router.navigate(['/recipes']);
        } else {
          alert('Failed to add recipe.' + response.error);
        }
      },

      error: (response) => {
        console.error('Error adding recipe:', response.error);
        alert('Error adding recipe. ' + response.error.error);
      },
    });
  }

  onCancel() {
    this.router.navigate(['/recipes']);
  }
}
