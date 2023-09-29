// @mui/material
import { Container } from "@mui/material";

// components
import TaskForm from "../../components/task/TaskForm";

// ----------------------------------------------------------------------

export default function TaskEdit() {
  return (
    <Container maxWidth="lg">
      <TaskForm isEdit={true} />
    </Container>
  );
}