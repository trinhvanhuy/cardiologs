import { RouterStateSerializer } from '@ngrx/router-store';
import { RouterStateSnapshot, Data, ActivatedRouteSnapshot } from '@angular/router';
import { RouterStoreState } from './router.state';

export class CustomRouterStateSerializer implements RouterStateSerializer<RouterStoreState> {
  public serialize(routerState: RouterStateSnapshot): RouterStoreState {
    let route: ActivatedRouteSnapshot = routerState.root;
    const { url } = routerState;
    const { queryParams } = route;
    const data = mergeRouteData(route);
    while (route.firstChild) {
      route = route.firstChild;
    }
    const { params } = route;
    return { url, params, queryParams, data };
  }
}

function mergeRouteData(route: ActivatedRouteSnapshot): Data {
  if (!route) {
    return {};
  }
  const currentData = route.data;
  const primaryChild = route.children.find(c => c.outlet === 'primary') || route.firstChild;
  return { ...currentData, ...mergeRouteData(primaryChild) };
}
