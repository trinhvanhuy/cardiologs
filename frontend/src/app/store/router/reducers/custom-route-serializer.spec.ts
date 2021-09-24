import { CustomRouterStateSerializer } from './custom-route-serializer';
import { RouterStateSnapshot, ActivatedRouteSnapshot, Params, Data } from '@angular/router';

let customRouterSerializer: CustomRouterStateSerializer;
describe('CustomRouterStateSerializer', () => {
  beforeEach(() => {
    customRouterSerializer = new CustomRouterStateSerializer();
  });

  it('should ', () => {
    // GIVEN
    const snapshot = createRouteSnapshot();

    const routerState = {
      url: 'url',
      root: snapshot,
    } as RouterStateSnapshot;

    // WHEN
    const actual = customRouterSerializer.serialize(routerState);

    // THEN
    const expected = createExpectedSnapshot();
    expect(actual).toEqual(expected);
  });
});

function createRouteSnapshot() {
  return {
    params: { param1: 'param' } as Params,
    url: [{ path: 'path1' }],
    firstChild: {
      url: [{ path: 'path1' }],
      params: { param3: 'param3' } as Params,
      data: { name2: 'data2' } as Data,
      children: [],
    } as ActivatedRouteSnapshot,
    queryParams: { param1: 'test1', param2: 'test2' } as Params,
    data: { name1: 'data1' } as Data,
    children: [],
  } as ActivatedRouteSnapshot;
}

function createExpectedSnapshot() {
  return {
    url: 'url',
    params: { param3: 'param3' },
    queryParams: { param1: 'test1', param2: 'test2' },
    data: { name1: 'data1', name2: 'data2' },
  };
}
