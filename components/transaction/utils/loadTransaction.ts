import { api } from "../../../../context/UserContext";

export default async function loadTransaction(ctx: any) {
  const id = ctx.params?.id;
  try {

    // Get the cookies from the request context
    const cookieHeader = ctx.req.headers.cookie || "";
    

    // Create axios request with the cookies
    const { data } = await api.get(`/api/fiatTransaction/${id}`, {
      headers: {
        Cookie: cookieHeader,
      },
    });
    return data;
  } catch (error) {
    console.error("Error loading transaction", error);
    console.log("🔥 raw cookie header:", ctx.req.headers.cookie);
    return null;
  }
}
