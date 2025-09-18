import { useAuth as useAuthContext } from "../contexts/AuthContext";

export const useAuth = useAuthContext;

export const useLogin = () => {
  const { login, loading } = useAuthContext();

  return {
    login,
    loading,
  };
};

export const useRegister = () => {
  const { register, loading } = useAuthContext();

  return {
    register,
    loading,
  };
};

export const useLogout = () => {
  const { logout } = useAuthContext();

  return { logout };
};

export const useCurrentUser = () => {
  const { user, isAuthenticated, loading } = useAuthContext();

  return {
    user,
    isAuthenticated,
    loading,
  };
};
