import React, { FC, useState } from 'react'
import { Box, Button, Card, CardContent, IconButton, Input } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'

import TaskCard from '../TaskCard'
import { TaskColumnRoot, DroppableComponent, classes } from './style';
import { ITask, ITaskColumn } from '../../interfaces/task.interface'

interface IDraggableElementProps {
  column: ITaskColumn;
  tasks: ITask[];
  onAddTask: (task: ITask) => void
}

const TaskColumn: FC<IDraggableElementProps> = ({
  column,
  tasks,
  onAddTask,
}) => {
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);

  const handleAddTask = () => {
    onAddTask({
      id: Date.now().toString(),
      status: column.status,
      title: newTaskTitle,
      description: '',
    });
    handleCloseNewTaskForm();
  };

  const handleCloseNewTaskForm = () => {
    setShowNewTaskForm(false);
    setNewTaskTitle('');
  };

  return (
    <TaskColumnRoot className={classes.root}>
      <Box className={classes.columnHeader}>{column.label}</Box>
      <DroppableComponent droppableId={`${column.status}`}>
        {(provided: any) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {tasks && tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </DroppableComponent>
      {
        !showNewTaskForm ? (
          <Button
            startIcon={<AddIcon />}
            onClick={() => setShowNewTaskForm(true)}
          >
            Add Task
          </Button>
        ) : (
          <Box>
            <Card>
              <CardContent>
                <Input
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                />
              </CardContent>
            </Card>
            <Box mt={2}>
              <Button variant="contained" disabled={!newTaskTitle} onClick={handleAddTask}>
                Add
              </Button>
              <IconButton onClick={handleCloseNewTaskForm}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        )
      }
    </TaskColumnRoot>
  )
};

export default TaskColumn;
