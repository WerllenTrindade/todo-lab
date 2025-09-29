import { PRIORITY } from "@/constants/priority";
import { getCurrentTime, getDate } from "@/utils/date";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { taskSchema } from "./schemas";
import { taskTypes } from "./types";


export function useTaskForm(){
    const form = useForm<taskTypes>({
        resolver: zodResolver(taskSchema),
        mode: "onChange",
        defaultValues: {
            alert: false,
            date: getDate(),
            description: '',
            endTime: getCurrentTime(),
            priority: PRIORITY.BAIXA,
            startTime: getCurrentTime(),
            title: ''
        }
    });

    const { control, handleSubmit, getValues, formState: { errors } } = form;

      const onSubmit = (data: taskTypes) => {
        console.log("values : ", data);
    };

    const onValues = () =>  console.log("values : ", getValues(), errors);

    return {
        control, 
        handleSubmit,
        onSubmit,
        onValues
    }
}