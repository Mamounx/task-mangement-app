
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// redux
import { createTask, updateTaskById } from "../../redux/slice/task";
import { RootState, useDispatch, useSelector } from "../../redux/store";

// @mui/material
import { Button, Card, CardActions, CardContent, CardHeader, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";

// @types
import { Status } from "../../@types/task";

// ----------------------------------------------------------------------

type Props = {
  isEdit: boolean
}

export default function TaskForm({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams()

  const { tasks } = useSelector(
    (state: RootState) => state.task
  );

  useEffect(() => {
    setTask(tasks?.find((task) => task.id === String(id)) as any)
  }, [tasks, id])
  

  const [task, setTask] = useState(tasks?.find((task) => task.id === String(id)));
  const [name, setName] = useState(task?.name || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState(task?.status || Status.OPEN);

  const handleClick = () => {
    if (!isEdit) {
      dispatch(createTask({ name, description, status: Status.OPEN }) as any);
    } else {
      dispatch(updateTaskById({ id: id, name, description, status }) as any);
    }
    navigate('/dashboard', { replace: true });
  };

  const handleNameChange = (event: any) => {
    setName(event.target.value)
  };

  const handleDescriptionChange = (event: any) => {
    setDescription(event.target.value)
  };

  const handleChangeStatus = (event: any) => {
    setStatus(event.target.value)
  };

  return (
    <Card sx={{ padding: "1rem" }}>
      <CardHeader title={isEdit ? "Edit Task" : "Create Task"} subheader={isEdit ? `${name}` : ""} />
      <CardContent>
        <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
          <TextField name="name" label="Name" onChange={handleNameChange} value={name} />

          <TextField
            name="description"
            label="Description"
            type="text"
            value={description}
            onChange={handleDescriptionChange}
            sx={{width: "550px"}}
            multiline
          />
          {isEdit &&
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label">Status</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={status}
                label="Status"
                onChange={handleChangeStatus}
              >
                <MenuItem value={'cancelled'}>{Status.CANCELLED}</MenuItem>
                <MenuItem value={'open'}>{Status.OPEN}</MenuItem>
                <MenuItem value={'inprogress'}>{Status.INPROGRESS}</MenuItem>
                <MenuItem value={'done'}>{Status.DONE}</MenuItem>
              </Select>
            </FormControl>
          }

        </Stack>
      </CardContent>
      <CardActions>
        <Button fullWidth size="medium" type="submit" variant="contained" onClick={handleClick} value={task?.description} sx={{ maxWidth: "10rem" }}>
          {isEdit ?  "Update Task" : "Create Task"}
        </Button>
      </CardActions>
    </Card>
  )
}