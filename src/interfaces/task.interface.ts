import { categoryTask } from "../app/enums/task.enum";

export interface taskResponse {
    id:           number;
    title:        string;
    description:  string;
    timeEstimate: Date;
    createdAt:    Date;
    completed: boolean
    category: string
}

export interface taskRequest{
    title: string,
    description: string,
    timeEstimate: string,
    createdAt: Date,
    category: categoryTask
}
