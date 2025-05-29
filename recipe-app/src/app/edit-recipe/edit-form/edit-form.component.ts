import { Component, ChangeDetectorRef, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

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
  selector: 'app-edit-recipe',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-form.component.html',
  styleUrl: './edit-form.component.scss',
})
export class EditRecipeComponent implements OnInit {
  recipes: Recipe[] = [];
  showAll: boolean = false;
  readonly API_URL =
    'https://express-api-jbkl.onrender.com/api/v1/admin/recipes';
  recipeInstructions: { id: number; text: string }[] = [{ id: 1, text: '' }];
  recipeId: string = '';
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

  isMobile: boolean = window.innerWidth <= 500;
  
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = window.innerWidth <= 500;
    this.cdRef.detectChanges();
  }

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
    this.route.queryParams.subscribe(params => {
      this.recipeId = params['id'];
      if (!this.recipeId) {
        console.error("No recipe ID provided in the URL.");
        alert("Recipe ID is missing. Please check the URL.");
        this.router.navigate(['/recipes']);
        return;
      }
      this.fetchRecipe();
    });
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
    private route: ActivatedRoute,
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

  fetchRecipe() {
    console.log('Fetching recipe with ID:', this.recipeId);
    const url = `https://express-api-jbkl.onrender.com/api/v1/recipes/${this.recipeId}`;
    console.log('Fetch URL:', url);
    
    this.http.get<ApiResponse>(url).subscribe({
      next: (response) => {
        console.log('Recipe fetch response:', response);
        if (response.success && !Array.isArray(response.data)) {
          this.recipe = response.data;
          // Convert instructions array to recipeInstructions format
          this.recipeInstructions = this.recipe.instructions.map((text, index) => ({
            id: index + 1,
            text: text
          }));
          console.log('Recipe loaded successfully:', this.recipe);
        } else {
          console.error('Invalid response format:', response);
          alert('Error: Invalid recipe data received');
        }
      },
      error: (err) => {
        console.error('Error fetching recipe:', err);
        console.error('Error status:', err.status);
        console.error('Error message:', err.message);
        console.error('Error details:', err.error);
        alert(`Error fetching recipe details: ${err.message || 'Unknown error'}`);
      }
    });
  }

  onSubmit() {
    console.log('Recipe to submit:', this.recipe);
    this.prepareForSubmit();
    const url = `https://express-api-jbkl.onrender.com/api/v1/admin/recipes/${this.recipeId}`;
    this.http.put<ApiResponse>(url, this.recipe).subscribe({
      next: (response) => {
        if (response.success) {
          alert('Recipe updated successfully!');
          this.router.navigate(['/recipes']);
        } else {
          alert('Failed to update recipe.' + response.error);
        }
      },
      error: (response) => {
        console.error('Error updating recipe:', response.error);
        alert('Error updating recipe. ' + response.error.error);
      },
    });
  }

  onCancel() {
    this.router.navigate(['/recipes']);
  }
}
