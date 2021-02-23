import { ActivationEnd } from "@angular/router";

export interface FilterButton{
    type: Filter;
    label: string;
    isActive: boolean;
}
// tao kieu du lieu Filter
export enum Filter{
    All,
    Active,
    Completed
}