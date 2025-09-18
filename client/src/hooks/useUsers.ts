import { useCallback } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USERS, GET_USER } from "@/graphql/queries";
import { CREATE_USER, UPDATE_USER, DELETE_USER } from "@/graphql/mutations";
import { User, CreateUserInput } from "@/types";

export const useUsers = () => {
  const { data, loading, error } = useQuery(GET_USERS, {
    errorPolicy: "all",
  });

  const [createUserMutation] = useMutation(CREATE_USER, {
    refetchQueries: [GET_USERS],
  });

  const [updateUserMutation] = useMutation(UPDATE_USER, {
    refetchQueries: [GET_USERS],
  });

  const [deleteUserMutation] = useMutation(DELETE_USER, {
    refetchQueries: [GET_USERS],
  });

  const users = data?.users || [];

  const createUser = useCallback(
    async (input: CreateUserInput): Promise<User> => {
      try {
        const result = await createUserMutation({
          variables: { input },
        });
        return result.data.createUser;
      } catch (error) {
        console.error("Error creating user:", error);
        throw error;
      }
    },
    [createUserMutation]
  );

  const updateUser = useCallback(
    async (id: string, input: CreateUserInput): Promise<User | null> => {
      try {
        const result = await updateUserMutation({
          variables: { id, input },
        });
        return result.data.updateUser;
      } catch (error) {
        console.error("Error updating user:", error);
        throw error;
      }
    },
    [updateUserMutation]
  );

  const deleteUser = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        const result = await deleteUserMutation({
          variables: { id },
        });
        return result.data.deleteUser;
      } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
      }
    },
    [deleteUserMutation]
  );

  return {
    users,
    loading,
    error,
    createUser,
    updateUser,
    deleteUser,
  };
};

export const useUser = (id: string) => {
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id },
    skip: !id,
    errorPolicy: "all",
  });

  const user = data?.user;

  return {
    user,
    loading,
    error,
  };
};
