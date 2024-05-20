import { HttpInterceptorFn, HttpParams } from "@angular/common/http";
import { LoaderService } from "./loader.service";
import { finalize } from "rxjs/operators";
import { inject } from "@angular/core";

export const KeyInterceptor: HttpInterceptorFn = (req, next) => {

    console.log('intercepotr')
    const loaderService = inject(LoaderService);
loaderService.show()    
    let newParams = new HttpParams({fromString: req.params.toString()});
    newParams = newParams.append('api_key', '767966187834fddd8ff19b00e6a923f5');
    
    const requestClone = req.clone({
        params: newParams
    });
    
    return next(requestClone).pipe(
        finalize(() => {
         loaderService.hide()
        })
    );
};
