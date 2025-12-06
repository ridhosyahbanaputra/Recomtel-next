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
  // console.log(`📡 Request ke: ${fullUrl}`); 
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