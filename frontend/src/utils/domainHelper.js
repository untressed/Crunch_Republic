// Utility to resolve smart links based on the active domain/subdomain
export const isSubdomainMode = () => {
  if (typeof window === 'undefined') return false;
  const hostname = window.location.hostname.toLowerCase();
  return hostname.endsWith('thecrunchrepublic.com');
};

export const getMenuUrl = (query = '') => {
  if (isSubdomainMode()) {
    return `https://menu.thecrunchrepublic.com${query ? (query.startsWith('?') ? query : '?' + query) : ''}`;
  }
  return `/menu${query ? (query.startsWith('?') ? query : '?' + query) : ''}`;
};

export const getAdminUrl = (path = '') => {
  if (isSubdomainMode()) {
    return `https://admin.thecrunchrepublic.com${path ? (path.startsWith('/') ? path : '/' + path) : ''}`;
  }
  return `/login${path ? (path.startsWith('/') ? path : '/' + path) : ''}`;
};

export const getMainUrl = (path = '') => {
  if (isSubdomainMode()) {
    return `https://www.thecrunchrepublic.com${path ? (path.startsWith('/') ? path : '/' + path) : ''}`;
  }
  return `/${path ? (path.startsWith('/') ? path.slice(1) : path) : ''}`;
};
