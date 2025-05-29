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

var delete_url = 'https://express-api-jbkl.onrender.com/api/v1/admin/recipes';

interface ApiResponse {
  success: boolean;
  data: Recipe[];
}

@Component({
  selector: 'app-delete-recipe',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './delete-recipe.component.html',
  styleUrl: './delete-recipe.component.scss',
})
export class DeleteRecipeComponent implements OnInit {
  recipes: Recipe[] = [];
  readonly API_URL = 'https://express-api-jbkl.onrender.com/api/v1/recipes';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.getRecipes();
  }

  getRecipes() {
    this.http.get<ApiResponse>(this.API_URL).subscribe({
      next: (response) => {
        this.recipes = response.data;
      },
      error: (err) => {
        console.error('Error fetching recipes:', err);
      },
    });
  }

  deleteRecipe(id: number) {
    if (confirm('Are you sure you want to delete this recipe?')) {
      this.http.delete(`${delete_url}/${id}`).subscribe({
        next: () => {
          this.recipes = this.recipes.filter((recipe) => recipe.id !== id);
        },
        error: (err) => {
          console.error('Error deleting recipe:', err);
        },
      });
    }
  }
}
