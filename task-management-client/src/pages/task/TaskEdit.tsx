import { Container } from "@mui/material";
import TaskForm from "../../components/task/TaskForm";

// ----------------------------------------------------------------------

export default function TaskEdit() {
  return (
    <Container maxWidth="lg">
      <TaskForm isEdit={true} />
    </Container>
  );
}