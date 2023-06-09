import { Injectable } from "@angular/core";
import { Router, CanActivate, CanDeactivate } from "@angular/router";
import { Observable } from "rxjs";
import { PARENT_PATHS,STORAGE_KEYS } from "src/app/common/constants";

export interface CanComponentDeactivate {
    canDeactivate:()=> Observable<boolean> | Promise<boolean> | boolean;
}
@Injectable()
export class ExternalAuthguardService
    implements CanActivate, CanDeactivate<CanComponentDeactivate> {
    constructor(public router: Router) { }

    canActivate(): boolean {
        if (!isAuthenticated()) {
            return true;
        }
        this.router.navigateByUrl(PARENT_PATHS.MAIN);
        return false;
    }

    canDeactivate(component: CanComponentDeactivate) {
        return component.canDeactivate ? component.canDeactivate() : true;
    }
}

@Injectable()
export class InternalAuthguardService
    implements CanActivate, CanDeactivate<CanComponentDeactivate> {
    constructor(public router: Router) { }

    canActivate(): boolean {
        if (isAuthenticated()) {
            return true;
        }
        this.router.navigateByUrl(PARENT_PATHS.AUTH);
        return false;
    }

    canDeactivate(component: CanComponentDeactivate) {
        return component.canDeactivate ? component.canDeactivate() : true;
    }
}

function isAuthenticated(): boolean {
    const token = sessionStorage.getItem("token");
    return !!token;
}
