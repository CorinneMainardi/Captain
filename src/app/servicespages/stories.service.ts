import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Injectable } from '@angular/core';
import { iStoria } from '../interfaces/istoria';

@Injectable({
  providedIn: 'root',
})
export class StoriesService {
  storiesUrl: string = environment.storiesUrl;
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
}
