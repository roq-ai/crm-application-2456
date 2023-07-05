const mapping: Record<string, string> = {
  companies: 'company',
  complaints: 'complaint',
  leads: 'lead',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
