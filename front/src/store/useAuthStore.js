import { create } from "zustand";
import axios from "axios";

const useAuthStore = create((set) => ({
  token: localStorage.getItem("token") || null,
  user: null,
  loading: false,

  login: async (email, password) => {
    try {
      set({ loading: true });
      const response = await axios.post("/api/users/login", {
        email,
        password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      set({ token });

      await useAuthStore.getState().fetchUser();
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  register: async (email, password, nombre, direccion, telefono) => {
    try {
      set({ loading: true });
      const response = await axios.post("/api/users/register", {
        email,
        password,
        nombre,
        direccion,
        telefono,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      set({ token });

      await useAuthStore.getState().fetchUser();
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  logout: () => {
    set({ token: null, user: null, loading: false });
    localStorage.removeItem("token");
  },

  fetchUser: async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        set({ loading: true });
        const response = await axios.get("/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        set({ user: response.data });
      } catch (error) {
        console.error("Error fetching user:", error);
        set({ token: null, user: null });
        localStorage.removeItem("token");
      } finally {
        set({ loading: false });
      }
    }
  },
}));

export default useAuthStore;
