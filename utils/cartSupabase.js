import { supabase } from "./supabase.js";

export async function saveCartToSupabase(userId, cartItems) {
  const { data, error } = await supabase.from("cart").upsert(
    [{ user_id: userId, cart_items: cartItems }],
    { onConflict: "user_id" } // ensures update if user cart exists
  );

  if (error) {
    console.error("Save cart failed:", error);
    return { success: false, message: error.message };
  }

  return { success: true };
}

export async function fetchCartFromSupaBase(userId) {
  const { data, error } = await supabase
    .from("cart")
    .select("cart_items")
    .eq("user_id", userId)
    .single();

  if (error) {
    console.error("Error fetching cart:", error);
    return [];
  }

  return data.cart_items || [];
}
