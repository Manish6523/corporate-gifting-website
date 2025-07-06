import { supabase } from "./supabase";
import { toast } from "react-hot-toast";
import { setCart, setSession } from "../src/features/cart/cartSlice";

// -------------------- SIGN UP --------------------
export async function SignUp(
  firstname,
  lastname,
  email,
  password,
  avatar,
  phone,
  gender,
  navigate,
  dispatch
) {
  try {
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          firstname,
          lastname,
          email,
          password,
          avatar,
          phone,
          gender,
        },
      ])
      .select()
      .single();

    if (error) {
      toast.error("Email already exists");
      dispatch(setSession(null));
      return { success: false, message: "Email already exists" };
    }

    const { password: _, ...userWithoutPassword } = data;
    dispatch(setSession(userWithoutPassword));
    toast.success("User created successfully");
    navigate("/dashboard");

    return {
      success: true,
      message: "User created",
      user: userWithoutPassword,
    };
  } catch (error) {
    console.error("Unexpected error during sign up:", error);
    dispatch(setSession(null));
    toast.error("Unexpected error during sign up.");
    return { success: false, message: "Unexpected error" };
  }
}

// -------------------- LOGIN --------------------
export async function Login(email, password, navigate, dispatch) {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .eq("password", password)
      .single();

    if (error) {
      toast.error("Invalid email or password");
      dispatch(setSession(null));
      return { success: false, message: "Invalid email or password" };
    }

    // Remove password before storing
    const { password: _, ...userWithoutPassword } = data;
    dispatch(setSession(userWithoutPassword));

    navigate("/dashboard");

    return {
      success: true,
      message: "Login successful",
      user: userWithoutPassword,
    };
  } catch (error) {
    console.error("Unexpected error during login:", error);
    dispatch(setSession(null));
    return { success: false, message: "Unexpected error" };
  }
}

// -------------------- LOGOUT --------------------
export async function Logout(navigate, dispatch) {
  try {
    // Clear session in Redux
    dispatch(setSession(null));
    localStorage.removeItem("session");

    toast.success("Logged out successfully");
    navigate("/auth");
  } catch (error) {
    console.error("Error during logout:", error);
    toast.error("Logout failed");
  }
}

// -------------------- Add Address --------------------
export async function AddAddress(
  address,
  phone,
  firstname,
  lastname,
  dispatch
) {
  try {
    const session = JSON.parse(localStorage.getItem("session"));
    if (!session) {
      toast.error("Please login to add an address");
      return { success: false, message: "User not logged in" };
    }

    const existingAddresses = session.address || [];

    const newAddress = {
      address,
      phone,
      firstname,
      lastname,
    };

    const updatedAddresses = [...existingAddresses, newAddress];

    const { data, error } = await supabase
      .from("users")
      .update({ address: updatedAddresses })
      .eq("id", session.id)
      .select()
      .single();

    if (error) {
      toast.error("Failed to add address");
      return { success: false, message: "Failed to add address" };
    }

    const updatedSession = { ...session, address: data.address };
    localStorage.setItem("session", JSON.stringify(updatedSession));
    dispatch(setSession(updatedSession));

    toast.success("Address added successfully");
    return { success: true, message: "Address added successfully" };
  } catch (error) {
    console.error("Unexpected error during add address:", error);
    return { success: false, message: "Unexpected error" };
  }
}

export async function DeleteAddress(addressIdx, dispatch) {
  try {
    const session = JSON.parse(localStorage.getItem("session"));
    if (!session) {
      toast.error("Please login to delete an address");
      return { success: false, message: "User not logged in" };
    }

    const updatedAddress = session.address.filter(
      (_, index) => index !== addressIdx
    );

    const { data, error } = await supabase
      .from("users")
      .update({ address: updatedAddress })
      .eq("id", session.id)
      .select()
      .single();

    if (error) {
      toast.error("Failed to delete address");
      return { success: false, message: "Failed to delete address" };
    }

    // Update session in Redux
    const updatedSession = { ...session, address: data.address };
    dispatch(setSession(updatedSession));

    toast.success("Address deleted successfully");

    return { success: true, message: "Address deleted successfully" };
  } catch (error) {
    console.error("Unexpected error during delete address:", error);
    return { success: false, message: "Unexpected error" };
  }
}

// -------------------- Fetch Orders --------------------
export async function fetchOrders(id) {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", id)
      .order("created_at", { ascending: false });

    return { success: true, orders: data, message: "Orders fetched successfully" };
  } catch (error) {
    console.error("Error fetching orders:", error);
    toast.error("Failed to fetch orders");
    return { success: false, message: "Failed to fetch orders" };
  }
}

export async function AddOrder(orderDetails, cart, price, dispatch) {
  try {
    const session = JSON.parse(localStorage.getItem("session"));

    const { data, error } = await supabase
      .from("orders")
      .insert([
        {
          user_id: session.id,
          order_cart: cart,
          order_pricing: price,
          order_details: orderDetails,
          status: "pending",
        },
      ])
      .select()
      .single();
    if (error) {
      console.error("Error adding order:", error);
      toast.error("Failed to add order");
      return { success: false, message: "Failed to add order" };
    }
    // Update cart in Redux
    // const newCart = [];
    // dispatch(setCart(newCart));
    return { success: true, message: "Order added successfully" };
  } catch (error) {
    console.error("Unexpected error during add order:", error);
    return { success: false, message: "Unexpected error" };
  }
}
