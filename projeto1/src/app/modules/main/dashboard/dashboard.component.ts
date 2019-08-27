import { UserService } from './../../../core/services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserModel } from '../../../core/models/user.model';
import { ResponseModel } from 'src/app/core/models/response.model';
import { ToastrService } from 'ngx-toastr';
import { PaginationModel } from 'src/app/core/models/pagination.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  public users: UserModel[];
  public loading: boolean;
  subscription: any;
  public pagination: PaginationModel;

  constructor(
    private service: UserService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.users = [];
    this.getUsers();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private getUsers(page?: number) {
    this.loading = true;
    this.subscription = this.service.getAll(page).subscribe(
      (response: ResponseModel) => {
        this.users = response.data;
        this.pagination = new PaginationModel();
        this.pagination.page = response.page;
        this.pagination.per_page = response.per_page;
        this.pagination.total = response.total;
        this.pagination.total_pages = response.total_pages;
        this.loading = false;
        // debugger;
      },
      (error) => {
        this.toastr.error('Lista indisponível');
        this.loading = false;
      }
    );
  }

  public nextPage() {
    this.getUsers(this.pagination.page + 1);
  }

  public jumpToPage(page: number) {
    this.getUsers(page);
  }

  public previousPage() {
    this.getUsers(this.pagination.page - 1);
  }

}
