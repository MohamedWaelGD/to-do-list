import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit, OnChanges {

  @ViewChild('shareWorkspaceClose') shareWorkspaceClose: any;
  @ViewChild('userWorkspacesBtn') userWorkspacesBtn: any;
  @ViewChild('editWorkspaceName') editWorkspaceName: any;

  @Input()
  selectedWorkspace!: any;

  @Output() onWorkspaceDeleted = new EventEmitter();

  loading: boolean = false;

  items!: any;
  selectedItem!: any;
  selectedUser!: any;
  usersOfWorkspace!: any;

  workspaceTitle!: any;

  cooperatorEmail!: any;
  cooperatorRole!: any;

  userProfile!: any;

  workspaceNameInput!: any;

  isOwner: boolean = false;

  constructor(private httpService:HttpService, private authService:AuthService, private modal:NgbModal) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.getItems();
    if (this.selectedWorkspace)
    {
      this.workspaceTitle = this.selectedWorkspace.name;
      this.workspaceNameInput = this.selectedWorkspace.name;
      this.getUsersWorkspace();
    }
  }

  ngOnInit(): void {
    this.authService.getProfile().subscribe({
      next: (result) => {
        this.userProfile = result.data;
      }
    })
  }

  getUsersWorkspace()
  {
    this.httpService.getUsersWorkspace(this.selectedWorkspace.id).subscribe({
      next: (result) => {
        this.usersOfWorkspace = result.data;
        this.usersOfWorkspace.forEach((element:any) => {
          if (element.user.email === this.userProfile.email && element.role === "Owner")
          {
            this.isOwner = true;
          }
        });
      }
    })
  }

  getItems()
  {
    if (this.selectedWorkspace)
    {
      this.httpService.getItems(this.selectedWorkspace.id).subscribe({
        next: (result) => {
          this.items = result.data;
        }
      })
    }
  }

  onAddItem(addItem: NgForm)
  {
    addItem.value.workspaceId = this.selectedWorkspace.id;
    this.httpService.addItem(addItem.value).subscribe({
      next: (result) => {
        this.items = result.data;
      }
    })
  }

  onDeleteItem(item: any)
  {
    this.httpService.deleteItem(item.id).subscribe({
      next: (result) => {
        this.items = result.data;
      }
    })
  }

  onChangeItemState(item: any)
  {
    this.loading = true;

    var model = {
      id: item.id,
      content: item.content,
      isDone: !item.isDone,
      workspaceId: this.selectedWorkspace.id
    }

    this.httpService.editItem(model).subscribe({
      next: (result) => {
        this.getItems();
        this.loading = false;
      }
    })
  }

  onSelectItem(item: any)
  {
    this.selectedItem = item;
  }

  editItem(input: any)
  {
    var model = {
      id: this.selectedItem.id,
      content: input.value,
      isDone: this.selectedItem.isDone,
      workspaceId: this.selectedWorkspace.id
    }

    this.httpService.editItem(model).subscribe({
      next: (result) => {
        this.getItems();
      }
    })
  }

  deleteWorkspace()
  {
    this.httpService.deleteWorkspace(this.selectedWorkspace.id).subscribe({
      next: (result) => {
        this.onWorkspaceDeleted.emit();
        this.getItems();
      }
    })
  }

  shareWorkspace(input: NgForm)
  {
    if (input.valid)
    {
      input.value.workspaceId = this.selectedWorkspace.id;
      this.httpService.shareWorkspace(input.value).subscribe({
        next: (result) => {
          this.getItems();
          this.shareWorkspaceClose.nativeElement.click();
        },
        error: (e) => {
          console.error(e);
        }
      })
    }
  }

  selectUserWorkspace(user: any)
  {
    this.selectedUser = user;
    this.cooperatorEmail = this.selectedUser.user.email;
    this.cooperatorRole = this.selectedUser.role === 'Partner' ? 1 : 2;
  }

  editUserWorkspace(input: NgForm)
  {
    input.value.workspaceId = this.selectedWorkspace.id;
    input.value.userId = this.selectedUser.userId;
    if (input.valid)
    {
      this.httpService.editUserWorkspace(input.value).subscribe({
        next: (result) => {
          this.userWorkspacesBtn.nativeElement.click();
        }
      })
    }
  }

  editWorkspace(input: NgForm)
  {
    input.value.name = this.workspaceNameInput;
    input.value.id = this.selectedWorkspace.id;
    this.httpService.editWorkspace(input.value).subscribe({
      next: (result) => {
        this.editWorkspaceName.nativeElement.click();
        this.onWorkspaceDeleted.emit();
        this.workspaceTitle = input.value.name;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
}
