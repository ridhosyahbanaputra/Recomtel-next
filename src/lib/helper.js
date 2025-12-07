export async function apiGet(path) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  let token = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const fullUrl = path.startsWith("http") ? path : `${baseUrl}${path}`;

  try {
    const res = await fetch(fullUrl, {
      method: "GET",
      headers: headers,
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`Faill Fetch! Status: ${res.status} (${res.statusText})`);

      if (res.status === 401) {
        console.warn("Token expired, menghapus sesi...");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Network Error (Server Down/Connection Lost):", error);
    return null;
  }
}

export async function apiPost(path, body) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  let token = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }

  const fullUrl = path.startsWith("http") ? path : `${baseUrl}${path}`;

  const headers = {};

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (!(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(body);
  }

  try {
    const res = await fetch(fullUrl, {
      method: "POST",
      headers: headers,
      body: body,
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`Faill POST! Status: ${res.status} (${res.statusText})`);

      if (res.status === 401) {
        console.warn("Token expired, menghapus sesi...");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
      throw new Error(res.statusText || "Gagal terhubung ke server");
    }

    return await res.json();
  } catch (error) {
    console.error("Network Error (POST):", error);

    throw error;
  }
}
