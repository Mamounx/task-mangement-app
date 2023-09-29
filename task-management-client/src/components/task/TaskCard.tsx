import { Card, CardActionArea, CardActions, CardContent, CardHeader, Chip, IconButton, Typography } from "@mui/material";

// icons
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import { Status } from "../../@types/task";
import { fDate } from "../../utils/formatDate";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "../../redux/store";
import { deleteTaskById, getTaskById, updateTaskById } from "../../redux/slice/task";
// ----------------------------------------------------------------------

type TaskCardProps = {
  task: any,
};

export default function TaskCard({ task }: TaskCardProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate()


  // const handleMarkComplete = () => {
  // };

  const handleMarkComplete = () => {
    dispatch(updateTaskById({ id: task.id, name: task.name, description: task.description, status: Status.DONE }) as any)
    window.location.reload();
  };

  const handleEdit = () => {
    dispatch(getTaskById(task.id) as any)
    navigate(`/dashboard/tasks/edit/${task.id}`)
  };

  const handleDelete = () => {
    dispatch(deleteTaskById(task.id) as any)
    window.location.reload();
  };

  return (
    <Card sx={{ bgcolor: "#ceecf0" }} >
      <CardActionArea onClick={handleEdit}>
        
        <CardHeader title={task.name} subheader={fDate(task.createdAt)} action={
          <Chip sx={{ opcaity: 0.7 }} label={
            task.status === Status.OPEN ? "Open" :
              task.status === Status.CANCELLED ? "Cancelled" :
                task.status === Status.INPROGRESS ? "In Progress" :
                  "Done"
          } color={
            task.status === Status.OPEN ? 'secondary' :
              task.status === Status.CANCELLED ? 'default' :
                task.status === Status.INPROGRESS ? 'warning' :
                  'success'
          } size="small" />
        } />

        <CardContent >
          <Typography flexWrap="wrap" variant="caption" sx={{ opacity: 0.8 }}>{task.description}</Typography>
        </CardContent>

        <CardActions>
          <IconButton aria-label="done" onClick={handleMarkComplete}>
            <DoneIcon />
          </IconButton>
          <IconButton aria-label="edit" onClick={handleEdit}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </CardActions>

      </CardActionArea>
    </Card>
  );
}