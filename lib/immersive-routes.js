// Lobby + Room routes render their own minimal chrome (a quiet mark, no header/footer).
export const IMMERSIVE_ROUTES = ["/lobby", "/belong", "/build", "/bring", "/seed", "/partner"];

export function isImmersiveRoute(pathname) {
  return IMMERSIVE_ROUTES.includes(pathname);
}
