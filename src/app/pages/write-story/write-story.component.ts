import { iCapitolo } from './../../interfaces/icapitolo';
import { Component } from '@angular/core';
import { iUser } from '../../interfaces/iuser';
import { AuthService } from '../../auth/auth.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { StoriesService } from '../../servicespages/stories.service';
import { iStoria } from '../../interfaces/istoria';

@Component({
  selector: 'app-write-story',
  templateUrl: './write-story.component.html',
  styleUrl: './write-story.component.scss',
})
export class WriteStoryComponent {
  user!: iUser;
  validateForm: FormGroup;

  constructor(
    private authSvc: AuthService,
    private fb: FormBuilder,
    private storiesSvc: StoriesService
  ) {
    this.validateForm = this.fb.group({
      title: ['', [Validators.required]],
      genere: ['', [Validators.required]],
      description: ['', [Validators.required]],
      numeroCapitoli: ['', [Validators.required, Validators.min(1)]],
      capitoli: this.fb.array([]), // Array di capitoli
    });
  }

  ngOnInit(): void {
    this.authSvc.user$.subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
  }

  // Getter per l'array di capitoli
  get capitoli(): FormArray {
    return this.validateForm.get('capitoli') as FormArray;
  }

  // Aggiungi o rimuovi i capitoli in base al numero inserito
  onCapitoliChange(): void {
    const numeroCapitoli = this.validateForm.value.numeroCapitoli;
    this.clearCapitoli(); // Pulisce i capitoli precedenti

    // Aggiunge i nuovi capitoli al form, inclusi il titolo, il corpo e il numero del capitolo
    for (let i = 0; i < numeroCapitoli; i++) {
      this.capitoli.push(
        this.fb.group({
          titolo: ['', Validators.required],
          contenuto: ['', Validators.required],
          numeroCapitolo: [i + 1, Validators.required], // aggiungi il numeroCapitolo
        })
      );
    }
  }

  // Rimuove tutti i capitoli
  clearCapitoli(): void {
    while (this.capitoli.length) {
      this.capitoli.removeAt(0);
    }
  }

  // Funzione per inviare il form

  submitForm(): void {
    if (this.validateForm.valid) {
      const newStoria: iStoria = {
        title: this.validateForm.value.title,
        description: this.validateForm.value.description,
        genere: this.validateForm.value.genere,
        userId: this.user.id,
        img: '', // Se hai bisogno di un'immagine, aggiungi un campo per caricarla nel form
        capitoli: this.capitoli.value.map(
          (c: {
            titolo: string;
            contenuto: string;
            numeroCapitolo: number;
          }) => ({
            titolo: c.titolo,
            body: c.contenuto, // Assicurati che il campo sia 'contenuto' (dal form) ma mappato come 'body'
            numeroCapitolo: c.numeroCapitolo,
          })
        ) as iCapitolo[], // Cast esplicito a iCapitolo[]
      };

      // Chiamata al servizio per aggiungere la storia
      this.storiesSvc.addNewStory(newStoria).subscribe({
        next: (response) => {
          console.log('Storia aggiunta con successo', response);
          this.validateForm.reset();
        },
        error: (error) => {
          console.error("Errore durante l'aggiunta della storia", error);
        },
      });
    } else {
      console.log('Il form non è valido');
    }
  }

  // Funzione per resettare il form
  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
  }
}
