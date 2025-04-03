import { useCallback } from "react";
import dayjs from "dayjs";  
import { updateElementToTheFirebase } from "@/app/services/firestore";

export const formatDateTime = (dateString: string) => {
  if (!dateString) return "***";
  return dayjs(dateString).format("DD/MM/YYYY HH:mm");
};

export const useTaskActions = () => {
  const handleCompleteForPerformer = useCallback(async (item: any,visibleDialog:any) => {
    console.log(visibleDialog);
    
    await updateElementToTheFirebase("tasks", { key: item.key, status: "in_review" }, () =>
      { 
         visibleDialog('');
      }); 
  }, []);

  const handleCompleteForOwner = useCallback(async (item: any,visibleDialog:any) => {
    console.log(visibleDialog);
    await updateElementToTheFirebase("tasks", { key: item.key, status: "completed" }, () =>
      { 
         visibleDialog('');
      });
  }, []);

  const handleRefactorForOwner = useCallback(
    async (item: any, visibleDialog: any) => { 
      await updateElementToTheFirebase("tasks", { key: item.key, status: "returned" }, () => {
        visibleDialog("");  
      });
    },
    [] 
  );
  

  const handleDeclined = useCallback(async (item: any,visibleDialog:any) => {
    console.log(visibleDialog);
    await updateElementToTheFirebase("tasks", { key: item.key, status: "declined" }, () =>
      { 
         visibleDialog('');
      });
  }, []);

  return {
    handleCompleteForPerformer,
    handleCompleteForOwner,
    handleRefactorForOwner,
    handleDeclined,
  };
};
