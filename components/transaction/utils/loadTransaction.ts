import axios from "axios";

export async function loadTransaction(ctx: any) {
  const id = ctx.params?.id;
  try {
    // Get the cookies from the request context
    const cookies = ctx.req?.cookies || {};

    // Create axios request with the cookies
    const { data } = await axios.get(`/api/fiatTransaction/${id}`, {
      headers: {
        Cookie: Object.entries(cookies)
          .map(([key, value]) => `${key}=${value}`)
          .join("; "),
      },
    });
    return data;
  } catch (error) {
    console.error("Error loading transaction", error);
    return null;
  }
}
