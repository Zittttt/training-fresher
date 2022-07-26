import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { LOGIN_INFO_KEY } from 'src/app/shared/common/constants';
import {
  LoginDto,
  ResponseBodyDto,
  SubmitLoginDto,
} from 'src/app/shared/common/interfaces';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    taiKhoan: new FormControl(null, [Validators.required]),
    matKhau: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(16),
    ]),
  });

  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  isLoading: boolean = false;

  ngOnInit(): void {}

  handleLogin() {
    // console.log(this.loginForm.value);
    this.isLoading = true;
    const submitDto: SubmitLoginDto = this.loginForm.value;
    this.authService.login(submitDto).subscribe({
      next: (result: ResponseBodyDto<LoginDto>) => {
        this.localStorageService.set<LoginDto>(LOGIN_INFO_KEY, result.content);
        alert('Login successfully');
        this.router.navigate(['home/movie-list']);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        this.isLoading = false;
      },
      complete: () => {
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      },
    });
  }
}
