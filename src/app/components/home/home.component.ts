import { Component, NgModule, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnChanges {

  workspaces!: Array<any>;

  selectedWorkspace!: any;

  constructor(private httpService: HttpService) { }
  ngOnChanges(changes: SimpleChanges): void {
    
  }

  ngOnInit(): void {
    this.getWorkspaces();
  }

  getWorkspaces()
  {
    this.httpService.getWorkspaces().subscribe({
      next: (result) => {
        this.workspaces = result.data;
      }
    })
  }

  onSubmitWorkspace(workspace: NgForm)
  {
    if (workspace.valid)
    {
      this.httpService.createWorkspace(workspace.value).subscribe({
        next: (result) => {
          this.workspaces = result.data;
        }
      })
    }
  }

  onSelectWorkspace(workspace: any)
  {
    this.selectedWorkspace = workspace;
  }
}
