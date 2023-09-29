

// ----------------------------------------------------------------------

import { Container } from "@mui/material";
import TaskForm from "../../components/task/TaskForm";

export default function TaskNew() {
  return (
    <Container maxWidth="lg">
      <TaskForm isEdit={false}/>
    </Container>
  );
}