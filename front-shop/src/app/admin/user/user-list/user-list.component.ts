import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  users : User[] = [];
  endSubscription$: Subject<any> = new Subject()
  constructor(private userService:UserService,private router:Router,private messageService:MessageService,private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    this._getUsers();
  }

  ngOnDestroy(): void {
    this.endSubscription$.next;
    this.endSubscription$.complete();
  }


  private _getUsers(){
    this.userService.getUsers().pipe(takeUntil(this.endSubscription$)).subscribe((res:any)=>{
      this.users = res.result

    })
  }

  deleteUser(userId:string){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete user ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.deleteUser(userId).subscribe((res)=>{
          this._getUsers()
          this.messageService.add({severity:'success', summary:'Service Message', detail:res.message});
        },(error)=>{
          this.messageService.add({severity:'error', summary:'Service Message', detail:'user can not be deleted'})
        })
      },
      reject: (type: any) => {}
  });
  }

  // getCountryName(countryKey:string){
  //   if(countryKey) return this.userService.getCountry(countryKey)
  // }

  updateUser(userId:string){
    this.router.navigateByUrl(`users/form/${userId}`)
  }
}
