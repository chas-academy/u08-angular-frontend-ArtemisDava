import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

interface Recipe {
  id: number;
  name: string;
  image: string;
  category: string;
}

interface ApiResponse {
  success: boolean;
  data: Recipe[];
}

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss'],
})
export class RecipesEditComponent implements OnInit {
  recipes: Recipe[] = [];
  showAll: boolean = false;
  readonly API_URL = 'https://express-api-jbkl.onrender.com/api/v1/recipes';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.getRecipes(4);
  }

  getRecipes(limit?: number) {
    this.http.get<ApiResponse>(this.API_URL).subscribe({
      next: (response) => {
        this.recipes = limit ? response.data.slice(0, limit) : response.data;
      },
      error: (err) => {
        console.error('Error fetching recipes:', err);
      },
    });
  }

  showMore() {
    this.showAll = true;
    this.getRecipes();
  }

  showLess() {
    this.showAll = false;
    this.getRecipes(4);
  }

  navigateToRecipe(id: number) {
    console.log('Navigating to recipe with ID:', id);
    this.router.navigate(['/edit-form'], { queryParams: { id } });
  }
}
