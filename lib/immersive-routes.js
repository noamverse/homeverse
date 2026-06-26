// Lobby and room routes render their own minimal chrome (ImmersiveNav, no SiteHeader/SiteFooter).
export const IMMERSIVE_ROUTES = ["/", "/lobby", "/belong", "/build", "/bring", "/seed", "/partner"];

export function isImmersiveRoute(pathname) {
  return IMMERSIVE_ROUTES.includes(pathname);
}

// Public editorial pages use the unified House Nav (SiteHeader) but no footer.
export const NO_FOOTER_ROUTES = ["/philosophy", "/family", "/stories", "/ecosystem"];

export function isNoFooterRoute(pathname) {
  return isImmersiveRoute(pathname) || NO_FOOTER_ROUTES.includes(pathname);
}
