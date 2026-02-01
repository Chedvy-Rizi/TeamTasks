import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, finalize, throwError } from "rxjs";
import { LoadingService } from "../service/loading-service";


export const Interceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    const loadingService = inject(LoadingService);
    const token = localStorage.getItem("token");

    loadingService.show();

    let requestToHandle = req;

    if (token) {
        requestToHandle = req.clone({
            setHeaders: { "Authorization": `Bearer ${token}` }
        });
    }

    return next(requestToHandle).pipe(
        finalize(() => loadingService.hide()),
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                localStorage.removeItem("token");
                router.navigate(['/login']);
            }
            return throwError(() => error);
        })
    );
};