import { Routes } from "@angular/router";
import { Preview } from "./components/preview/preview";

export const PRACTIOTIONER_ROUTES: Routes = [
  {
    path: '',
    component: Preview,
    children: [
      {
        path: 'connect',
        component: Preview
      },
    ]
  }
];