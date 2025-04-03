import { useCallback } from "react";
import dayjs from "dayjs";  
import { updateElementToTheFirebase } from "@/app/services/firestore";

export const formatDateTime = (dateString: string) => {
  if (!dateString) return "***";
  return dayjs(dateString).format("DD/MM/YYYY HH:mm");
};

export const useTaskActions = () => {
  const handleCompleteForPerformer = useCallback(async (item: any) => {
    await updateElementToTheFirebase("tasks", { key: item.key, status: "in_review" });
  }, []);

  const handleCompleteForOwner = useCallback(async (item: any) => {
    await updateElementToTheFirebase("tasks", { key: item.key, status: "completed" });
  }, []);

  const handleRefactorForOwner = useCallback(async (item: any) => {
    await updateElementToTheFirebase("tasks", { key: item.key, status: "returned" });
  }, []);

  const handleDeclined = useCallback(async (item: any) => {
    await updateElementToTheFirebase("tasks", { key: item.key, status: "declined" });
  }, []);

  return {
    handleCompleteForPerformer,
    handleCompleteForOwner,
    handleRefactorForOwner,
    handleDeclined,
  };
};
