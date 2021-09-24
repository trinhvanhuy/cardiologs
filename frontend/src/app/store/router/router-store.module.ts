import { NgModule, Self, Optional } from '@angular/core';
import {
  routerReducer,
  StoreRouterConnectingModule,
  RouterStateSerializer,
  NavigationActionTiming,
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { Router } from '@angular/router';
import { CustomRouterStateSerializer } from './reducers/custom-route-serializer';

const routerStateConfig = {
  stateKey: 'router',
  navigationActionTiming: NavigationActionTiming.PostActivation,
};

@NgModule({
  imports: [
    StoreModule.forFeature(routerStateConfig.stateKey, routerReducer),
    StoreRouterConnectingModule.forRoot(routerStateConfig),
  ],
  exports: [StoreModule, StoreRouterConnectingModule],
  providers: [
    {
      provide: RouterStateSerializer,
      useClass: CustomRouterStateSerializer,
    },
  ],
})
export class CustomRouterStoreModule {
  constructor(@Self() @Optional() router: Router) {
    if (!router) {
      console.error(
        'NgrxRouterStoreModule must be imported in the same same level as RouterModule',
      );
    }
  }
}
