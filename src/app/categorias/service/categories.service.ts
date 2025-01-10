import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private readonly categoriesSubject = new BehaviorSubject<any[]>(this.getCategoriesFromStorage());
    categories$ = this.categoriesSubject.asObservable();
  
    private getCategoriesFromStorage(): any[] {
      const categorie = localStorage.getItem('categories');
      return categorie ? JSON.parse(categorie) : [];
    }
  
    addCategorie(newCategorie: any): void {
      const currentCategorie = this.getCategoriesFromStorage();
      const updatedCategories = [...currentCategorie, newCategorie];
      localStorage.setItem('categories', JSON.stringify(updatedCategories));
      this.categoriesSubject.next(updatedCategories); 
    }
  
    removeCategorie(index: number): void {
      const currentCategorie = this.getCategoriesFromStorage();
      currentCategorie.splice(index, 1);
      localStorage.setItem('categories', JSON.stringify(currentCategorie));
      this.categoriesSubject.next(currentCategorie); 
    }
  
    updateCategorie(index: number, updatedCategories: any): void {
      const currentCategorie = this.getCategoriesFromStorage();
      currentCategorie[index] = updatedCategories; 
      localStorage.setItem('categories', JSON.stringify(currentCategorie));
      this.categoriesSubject.next(currentCategorie);
    }
}
