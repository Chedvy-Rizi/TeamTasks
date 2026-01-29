import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";


export const Interceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    const token = localStorage.getItem("token");
    if (token) {
        const modifiedReq = req.clone({
            setHeaders: {
                "Authorization": `Bearer ${token}`
            }
        });
        return next(modifiedReq);
    }
    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                //shaow alert errors
                localStorage.removeItem("token");
                router.navigate(['/login']);
            }
            return throwError(() => error);
        })
    );
};

