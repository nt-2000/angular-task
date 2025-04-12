import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { LoaderService } from './core/services/loader.service';
import { LoaderComponent } from "./shared/components/loader/loader.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'assignment-task';

  isLoading:boolean = false;

  constructor(private loaderService: LoaderService){
    this.loaderService.loading$.subscribe({
      next:(data)=> {
        this.isLoading = data
      },
      error:(error)=>{
        console.error(error);
      }
    })
  }
}
