import { Box, Card, CardHeader, Checkbox, Chip, Divider, FormControlLabel, IconButton, MenuItem, Popover, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useForm, Controller } from 'react-hook-form';
import { Status, Task } from "../../@types/task";

// icons
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import { useNavigate } from "react-router-dom";
import { fDate } from "../../utils/formatDate";
import { useDispatch } from "../../redux/store";
import { deleteTaskById, getTaskById, updateTaskById } from "../../redux/slice/task";

// ----------------------------------------------------------------------

type Props = {
  tasks?: Task[] | null
}

export default function TaskList({ tasks }: Props) {
  const { control } = useForm({
    defaultValues: {
      taskCompleted: ['2'],
    },
  });

  return (
    <Card >
      <CardHeader
        title={"Task List"} />
      <Controller
        name="taskCompleted"
        control={control}
        render={({ field }) => {
          const onSelected = (task: any) => 
            field.value.includes(task.id) ? field.value.filter((value) => value !== task.id) : [...field.value, task.id]
          

          return (
            <>
              {tasks ? tasks.map((task: any) => (
                <Box key={task.id}>
                  <TaskItem
                    key={task.id}
                    task={task}
                    checked={field.value.includes(task.id)}
                    onChange={() => field.onChange(onSelected(task))}
                  />
                  <Divider variant="middle" />
                </Box>
              )) :
                <Typography>No tasks available!</Typography>}
            </>
          );
        }}
      />
    </Card>
  );
}

type TaskItemProps = {
  checked: any,
  onChange: any,
  task: any,
};

function TaskItem({ task, checked, onChange }: TaskItemProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event: any) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleMarkComplete = () => {
    dispatch(updateTaskById({ id: task.id, name: task.name, description: task.description, status: Status.DONE }) as any)
    handleCloseMenu();
    window.location.reload();
  };

  const handleEdit = () => {
    handleCloseMenu();
    dispatch(getTaskById(task.id) as any)
    navigate(`/dashboard/tasks/edit/${task.id}`)
  };

  const handleDelete = () => {
    handleCloseMenu();
    dispatch(deleteTaskById(task.id) as any)
    window.location.reload();
  };

  return (
    <Stack
      direction="row"
      sx={{
        px: 2,
        py: 0.75,
        ...(checked && {
          color: 'text.disabled',
          textDecoration: 'line-through',
        }),
      }}
    >
      <>
        <FormControlLabel
          control={<Checkbox checked={checked} onChange={onChange} />}
          label={`${task.name}`}
          sx={{ flexGrow: 1, m: 0 }}
        />

        <Stack direction="row" spacing={2} sx={{ opacity: 0.70, paddingY: 2}} >
          <Typography >
            {fDate(task.createdAt)}
          </Typography>
          <Chip label={
            task.status === Status.OPEN ? "Open": 
            task.status === Status.CANCELLED ? "Cancelled" : 
            task.status === Status.INPROGRESS ? "In Progress" : 
            "Done"
            } color={
            task.status === Status.OPEN ? 'secondary' : 
            task.status === Status.CANCELLED ? 'default' : 
            task.status === Status.INPROGRESS ? 'warning' : 
            'success'
            } size="small" />
        </Stack>

        <IconButton size="large" color="inherit" sx={{ opacity: 0.48 }} onClick={handleOpenMenu}>
          <MoreVertIcon />
        </IconButton>
      </>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={handleMarkComplete}>
          <DoneIcon fontSize="small" />
          Mark Complete
        </MenuItem>

        <MenuItem onClick={handleEdit}>
          <EditIcon fontSize="small" />
          Edit
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <DeleteIcon fontSize="small" />
          Delete
        </MenuItem>
      </Popover>
    </Stack>
  );
}