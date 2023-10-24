import { RouteLoader } from './plugin.router';

export function ensureRoutesExist<T extends RouteLoader>(routeLoader: T) {
  return () => routeLoader.loadRoutes();
}
