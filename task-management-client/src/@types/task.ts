export type Task = {
    id?: string;
    name: string;
    description: string;
    status: StatusEnum;
    createdAt?: number;
    updatedAt?: number;
};


export type TaskState = {
    isLoading : boolean ;
    error: Error | string | null;
    tasks: Task[] | null;
    task: Task | null;
};

export enum Status {
    OPEN = "open",
    INPROGRESS = "inprogress",
    CANCELLED = "cancelled",
    DONE = "done"
};

export type StatusEnum = 'open' | 'inprogress' | 'cancelled' | 'done'