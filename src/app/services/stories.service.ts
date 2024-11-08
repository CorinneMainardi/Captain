import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Injectable } from '@angular/core';
import { iStoria } from '../interfaces/istoria';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoriesService {
  storiesUrl: string = environment.storiesUrl;

  private deleteSubject$ = new Subject<number>(); // Subject per ID delle storie da eliminare
  deleteObservable$ = this.deleteSubject$.asObservable(); // Observable per iscriversi

  constructor(private http: HttpClient) {}

  getAllStories() {
    return this.http.get<iStoria[]>(this.storiesUrl);
  }

  getStoriaById(id: number) {
    return this.http.get<iStoria>(`${this.storiesUrl}/${id}`);
  }

  addNewStory(newStory: iStoria) {
    return this.http.post<iStoria>(this.storiesUrl, newStory);
  }

  // Metodo per notificare eliminazioni tramite Subject
  notifyDelete(id: number): void {
    this.deleteSubject$.next(id);
  }
}
