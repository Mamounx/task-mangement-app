

// ----------------------------------------------------------------------

import { Grid, Typography } from "@mui/material";
import { Task } from "../../@types/task";

// icons
import TaskCard from "./TaskCard";

type Props = {
    tasks?: Task[] | null
}

export default function TaskGrid({ tasks }: Props) {
    return (
        <Grid container spacing={2}>
            {tasks ? tasks.map((task: any) => (
                <Grid key={task.id} item xs={4}>
                    <TaskCard task={task} />
                </Grid>
            )) : (
                <Grid item xs={12}>
                    <Typography textAlign='center' variant="h4">No tasks available!</Typography>
                </Grid>)}
        </Grid>
    )
}