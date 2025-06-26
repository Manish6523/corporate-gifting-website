import { supabase } from "./supabase";
import { toast } from "react-hot-toast";
import { setSession } from "../src/features/cart/cartSlice";

// -------------------- SIGN UP --------------------
export async function SignUp(firstname, lastname, email, password, avatar, address, phone, gender, navigate, dispatch) {
  try {
    const { data, error } = await supabase
      .from("users")
      .insert([{ firstname, lastname, email, password, avatar, address, phone, gender }])
      .select()
      .single(); // Get the inserted row

    if (error) {
      toast.error("Email already exists");
      dispatch(setSession(null));
      return { success: false, message: "Email already exists" };
    }

    // Remove password before storing in session
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
    navigate("/login");
  } catch (error) {
    console.error("Error during logout:", error);
    toast.error("Logout failed");
  }
}
