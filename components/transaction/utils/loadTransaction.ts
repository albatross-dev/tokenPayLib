import { api } from "../../../../context/UserContext";

export default async function loadTransaction(ctx: any) {
  const id = ctx.params?.id;
  try {
    // Get the cookies from the request context
    const cookies = ctx.req?.cookies || {};

    console.log("cookies", cookies);
    console.log("id", id);
    console.log("ctx", ctx);

    // print Object.entries(cookies)
    console.log("content",Object.entries(cookies)
      .map(([key, value]) => `${key}=${value}`)
      .join("; "));



    // Create axios request with the cookies
    const { data } = await api.get(`/api/fiatTransaction/${id}`, {
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
