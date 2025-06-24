import { supabase } from "./supabase.js";

export async function saveCartToSupabase(userId, cartItems) {
  const { data, error } = await supabase.from("cart").upsert(
    [{ user_id: userId, cart_items: cartItems }],
    { onConflict: "user_id" }
  );

  if (error) {
    console.error("Save cart failed:", error);
    return { success: false, message: error.message };
  }

  return { success: true };
}

export async function saveWishListToSupabase(userId, wishListItems) {
  const { data, error } = await supabase.from("users").upsert(
    [{ id: userId, wishlist: wishListItems }],
    { onConflict: "id" }
  );

  if (error) {
    console.error("Save wishlist failed:", error);
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

export async function fetchWishListFromSupaBase(userId) {
  const { data, error } = await supabase
    .from("users")
    .select("wishlist")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching wishlist:", error);
    return [];
  }

  return data.wishlist || [];
}
