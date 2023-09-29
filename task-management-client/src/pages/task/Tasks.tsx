
import { useEffect, useState } from "react";
import { RootState, useSelector, useDispatch } from "../../redux/store";
import { getAllTasks } from "../../redux/slice/task";
import { Button, Container, IconButton, Stack, Typography } from "@mui/material";
import TaskList from "../../components/task/TaskList";
import { useNavigate } from "react-router-dom";

//icons
import ListIcon from '@mui/icons-material/List';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import TaskGrid from "../../components/task/TaskGrid";

// ----------------------------------------------------------------------

export default function Tasks() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [isListView, setIsListView] = useState(true)


  const { tasks } = useSelector(
    (state: RootState) => state.task
  );

  const handleChangeView = (value: boolean) => {
    setIsListView(value)
  }

  const handleNewTaskClick = () => {
    navigate("/dashboard/tasks/new")
  }

  useEffect(() => {
    dispatch(getAllTasks() as any);
  }, [dispatch]);

  return (
    <>
      <Container maxWidth="lg">
        <Stack
          direction="column"
          spacing={2}
        >
          <Typography variant="h3">Tasks</Typography>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <IconButton onClick={() => handleChangeView(true)}>
                <ListIcon />
              </IconButton>
              <IconButton onClick={() => handleChangeView(false)}>
                <ViewModuleIcon />
              </IconButton>
            </Stack>
            <Button variant="contained" onClick={handleNewTaskClick}>
              New Task
            </Button>
          </Stack>
          {isListView ? <TaskList tasks={tasks} /> : <TaskGrid tasks={tasks}/>}
        </Stack>
      </Container>
    </>
  );
}