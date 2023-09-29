// @mui/material
import { Container } from "@mui/material";

// components
import TaskForm from "../../components/task/TaskForm";

// ----------------------------------------------------------------------

export default function TaskNew() {
  return (
    <Container maxWidth="lg">
      <TaskForm isEdit={false}/>
    </Container>
  );
}