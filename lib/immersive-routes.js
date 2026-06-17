// Lobby and room routes render their own minimal chrome (ImmersiveNav, no SiteHeader/SiteFooter).
export const IMMERSIVE_ROUTES = ["/", "/lobby", "/belong", "/build", "/bring", "/seed", "/partner"];

export function isImmersiveRoute(pathname) {
  return IMMERSIVE_ROUTES.includes(pathname);
}
