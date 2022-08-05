import React, { FC, useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'

import TaskCard from '../TaskCard'
import { ITask, ITaskColumn } from '../../interfaces/task.interface'
import { TaskColumnRoot, DroppableComponent, classes } from './style';

interface IDraggableElementProps {
  column: ITaskColumn;
  tasks: ITask[];
  onAddTask: (task: ITask) => void;
  onRemoveTask: (id: string) => void;
}

const TaskColumn: FC<IDraggableElementProps> = ({
  column,
  tasks,
  onAddTask,
  onRemoveTask,
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
      <Box className={classes.columnHeader}>
        <Typography variant="h6">
          {column.label}
        </Typography>
      </Box>
      <DroppableComponent droppableId={`${column.status}`}>
        {(provided: any) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {tasks && tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onRemoveTask={onRemoveTask}
              />
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
