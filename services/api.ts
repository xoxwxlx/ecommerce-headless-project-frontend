export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

// ---- PRODUCTS ----
export async function getProducts() {
  const res = await fetch(`${API_URL}/products/`);
  return res.json();
}

export async function getProduct(id: string | number) {
  const res = await fetch(`${API_URL}/products/${id}/`);
  return res.json();
}

// ---- AUTHENTICATION ----
export async function register(data: { email: string; password: string; first_name?: string; last_name?: string }) {
  const res = await fetch(`${API_URL}/users/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function login(credentials: { email: string; password: string }) {
  const res = await fetch(`${API_URL}/token/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return res.json();
}

// ---- CART ----
export async function getCart(token: string) {
  const res = await fetch(`${API_URL}/cart/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

export async function syncCart(data: { product_id: string | number; quantity: number }, token: string) {
  const res = await fetch(`${API_URL}/cart/add/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

// ---- PAYMENTS ----
export async function createCheckout(cart: unknown[], token: string) {
  const res = await fetch(`${API_URL}/payments/create-checkout-session/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ cart }),
  });
  return res.json();
}

// ---- LEGACY / BACKWARD COMPATIBILITY ----
export const API = API_URL;

export async function addToCart(productId: string | number, quantity: number, token: string) {
  return syncCart({ product_id: productId, quantity }, token);
}

export async function createCheckoutSession(token: string) {
  return createCheckout([], token);
}

export async function loginUser(email: string, password: string) {
  return login({ email, password });
}

// ---- VENDOR ----
export async function getVendorProducts(token: string) {
  const res = await fetch(`${API_URL}/vendor/products/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Failed to fetch vendor products');
  return res.json();
}

export async function getVendorProduct(id: string | number, token: string) {
  const res = await fetch(`${API_URL}/vendor/products/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Failed to fetch vendor product');
  return res.json();
}

export async function updateVendorProduct(
  id: string | number,
  data: {
    description?: string;
    pages?: number;
    publication_year?: number;
    image?: string;
  },
  token: string
) {
  const res = await fetch(`${API_URL}/vendor/products/${id}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update product');
  return res.json();
}

export async function uploadProductImage(file: File, token: string) {
  const formData = new FormData();
  formData.append('image', file);
  
  const res = await fetch(`${API_URL}/vendor/upload-image/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  if (!res.ok) throw new Error('Failed to upload image');
  return res.json();
}

export async function getVendorAnalytics(token: string) {
  const res = await fetch(`${API_URL}/vendor/analytics/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Failed to fetch analytics');
  return res.json();
}

export async function getUserProfile(token: string) {
  const res = await fetch(`${API_URL}/users/me/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Failed to fetch user profile');
  return res.json();
}

export async function getVendorsList() {
  const res = await fetch(`${API_URL}/users/vendor/companies/`);
  if (!res.ok) throw new Error('Failed to fetch vendors list');
  return res.json();
}

export async function registerVendorUser(data: {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  vendor_id: number;
  company_password: string;
}) {
  const res = await fetch(`${API_URL}/auth/vendor/register/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || errorData.message || 'Registration failed');
  }
  return res.json();
}