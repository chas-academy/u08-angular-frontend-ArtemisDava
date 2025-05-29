import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { AddRecipeComponent } from './add-recipe.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

describe('AddRecipeComponent', () => {
  let component: AddRecipeComponent;
  let fixture: ComponentFixture<AddRecipeComponent>;
  let httpMock: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;
  let cdRefSpy: jasmine.SpyObj<ChangeDetectorRef>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    cdRefSpy = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);

    await TestBed.configureTestingModule({
      imports: [AddRecipeComponent, HttpClientTestingModule, FormsModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ChangeDetectorRef, useValue: cdRefSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddRecipeComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize categories and ingredients on init', fakeAsync(() => {
    //with this mock data
    const mockCategories = { data: [{ name: 'Dessert' }] };
    const mockIngredients = { data: [{ name: 'Sugar' }] };

    //when this happens
    component.ngOnInit();

    const catRequest = httpMock.expectOne(
      'https://express-api-jbkl.onrender.com/api/v1/categories'
    );
    catRequest.flush(mockCategories);

    const ingRequest = httpMock.expectOne(
      'https://express-api-jbkl.onrender.com/api/v1/ingredients'
    );
    ingRequest.flush(mockIngredients);

    tick();

    // expect this
    expect(component.categories).toEqual(mockCategories.data);
    expect(component.ingredients).toEqual(mockIngredients.data);
  }));

  it('should add and remove ingredients', () => {
    expect(component.recipe.ingredients.length).toBe(0);
    component.addIngredient();
    expect(component.recipe.ingredients.length).toBe(1);
    component.removeIngredient(0);
    expect(component.recipe.ingredients.length).toBe(0);
  });

  it('should prepare instructions before submit', () => {
    component.recipeInstructions = [
      { id: 1, text: 'Step 1' },
      { id: 2, text: 'Step 2' },
    ];
    component.prepareForSubmit();
    expect(component.recipe.instructions).toEqual(['Step 1', 'Step 2']);
  });

  it('should submit the recipe successfully', fakeAsync(() => {
    component.recipe.name = 'Test';
    component.recipeInstructions = [{ id: 1, text: 'Do something' }];
    const mockResponse = {
      success: true,
      error: [],
      data: { ...component.recipe },
    };

    spyOn(window, 'alert');
    component.onSubmit();

    const req = httpMock.expectOne(component.API_URL);
    req.flush(mockResponse);
    tick();

    expect(component.recipes.length).toBe(1);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/recipes']);
    expect(window.alert).toHaveBeenCalledWith('Recipe added successfully!');
  }));

  it('should cancel and navigate to /recipes', () => {
    component.onCancel();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/recipes']);
  });
});
