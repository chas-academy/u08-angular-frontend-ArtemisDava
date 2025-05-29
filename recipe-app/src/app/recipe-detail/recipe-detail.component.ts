import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}

interface Recipe {
  id: number;
  name: string;
  image: string;
  ingredients: Ingredient[];
  instructions: string[];
  category: string;
}

interface ApiResponse {
  success: boolean;
  data: Recipe;
}

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe | null = null;
  readonly API_URL = 'https://express-api-jbkl.onrender.com/api/v1/recipes';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.getRecipe(id);
      }
    });
  }

  getRecipe(id: string) {
    console.log('Fetching recipe with ID:', id);
    this.http.get<ApiResponse>(`${this.API_URL}/${id}`).subscribe({
      next: (response) => {
        console.log('Recipe data received:', response);
        this.recipe = response.data;
      },
      error: (err) => {
        console.error('Error fetching recipe:', err);
      }
    });
  }
}
