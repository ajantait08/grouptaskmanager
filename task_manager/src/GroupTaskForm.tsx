import React, { useState, useEffect } from 'react';
import {
  Grid,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Divider,
  Card,
  CardContent,
  CardHeader,
} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

interface Groups {
  [key: string]: string[];
}

interface TaskDetails {
  id: string | number;
  task: string;
  quantity: number | string;
  rate: number | string;
}

const GroupTaskForm: React.FC = () => {
  const [groupName, setGroupName] = useState<string>('');
  const [groups, setGroups] = useState<Groups>({});
  const [quantity, setQuantity] = useState<string>('');
  const [rate, setRate] = useState<string>('');
  const [addMoreTask, setAddMoreTask] = useState<TaskDetails[]>([]);
  const [countTask, setCountTask] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const handleCreateGroup = (): void => {
    if (groupName.trim()) {
      setGroups({ ...groups, [groupName]: [] });
      setGroupName('');
    }
  };

  const handleAddTask = (): void => {
    setAddMoreTask([...addMoreTask, { id: countTask, task: '', quantity: '', rate: '' }]);
    setCountTask(countTask + 1);
  };

  const handleTaskChange = (index: number, field: keyof TaskDetails, value: string | number) => {
    const updatedTasks = [...addMoreTask];
    updatedTasks[index] = {
      ...updatedTasks[index],
      [field]: value,
    };
    setAddMoreTask(updatedTasks);
  };

  const handleChange = (index: number, event: SelectChangeEvent<string | number>) => {
    const updatedTasks = [...addMoreTask];
    updatedTasks[index] = {
      ...updatedTasks[index],
      quantity: event.target.value,
    };
    setAddMoreTask(updatedTasks);
  };

  const handleDeleteTask = (index: number): void => {
    const updatedTasks = addMoreTask.filter((_, i) => i !== index);
    setAddMoreTask(updatedTasks);
  };

  useEffect(() => {
    const total = addMoreTask.reduce((sum, task) => {
      return sum + Number(task.quantity) * Number(task.rate);
    }, 0);
    setTotalAmount(total);
  }, [addMoreTask]);

  return (
    <Box alignItems="center" gap={4} p={2}>
      <Box sx={{m:2}}>
        <Typography
          variant="body1"
          align="left"
          sx={{
            textDecoration: 'underline',
            textUnderlineOffset: '4px',
            fontWeight: 600,
          }}
        >
          CREATE TASKS
        </Typography>
      </Box>

      <Divider />
      {/* <FormControl fullWidth size="small">
      <FormControlLabel
        control={
          <Switch
            checked={isGroupingEnabled}
            onChange={() => setIsGroupingEnabled(!isGroupingEnabled)}
            color="primary"
          />
        }
        label="Enable Grouping"
      />
      </FormControl>     */}

      <Grid container spacing={2} style={{ marginTop: '20px' }}>
        <Grid item xs={12} sm={12} md={12}>
          <Paper style={{ marginBottom: '10px' }}>
            <Box component="form" sx={{ flexGrow: 1, p: 2 }} noValidate autoComplete="off">
              {countTask > 0 &&
                addMoreTask.map((task, index) => (
                  <Grid container spacing={2} alignItems="center" key={index} sx={{ p : 2}}>
                    <Grid item xs={12} sm={2} md={2}>
                      <TextField
                        fullWidth
                        label="Task Name"
                        variant="outlined"
                        value={task.task}
                        onChange={(e) => handleTaskChange(index, 'task', e.target.value)}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={2} md={2}>
                      <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={task.quantity}
                          onChange={(event) => handleChange(index, event)}
                          label="Quantity"
                        >
                          <MenuItem value="">
                            <em>Please Select</em>
                          </MenuItem>
                          <MenuItem value={1}>1</MenuItem>
                          <MenuItem value={2}>2</MenuItem>
                          <MenuItem value={3}>3</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={2} md={2}>
                      <TextField
                        fullWidth
                        label="Rate in $(dollars)"
                        variant="outlined"
                        value={task.rate}
                        onChange={(e) => handleTaskChange(index, 'rate', e.target.value)}
                        size="small"
                      />
                    </Grid>

                    <Grid item xs={12} sm={2} md={2}>
                    <Button variant="contained" color="error" size="medium" onClick={() => handleDeleteTask(index)}>
                      DELETE TASK
                    </Button>
                  </Grid>

                  <Grid item xs={12} sm={4} md={4}>
                  <Card>
                    <CardHeader
                      sx={{ backgroundColor: '#c16262' }}
                      title={
                        <Typography
                          variant="h4"
                          align="center"
                          gutterBottom
                          sx={{ fontSize: '16px !important', fontWeight: 600 }}
                        >
                          Quantity and Amount Details Per Task
                        </Typography>
                      }
                    />
                    <CardContent>
                          <Typography variant="body1">
                            <strong>Task:</strong> {task.task == '' ? <strong>NA</strong> : task.task}
                          </Typography>
                          <Typography variant="body1">
                            <strong>Quantity:</strong> {task.quantity == '' ? <strong>NA</strong> : task.quantity}
                          </Typography>
                          <Typography variant="body1">
                            <strong>Total Amount:</strong> ${Number(task.quantity) * Number(task.rate)}
                          </Typography>
                        </CardContent>
                  </Card>
                  </Grid>
                  </Grid>
                ))}
            </Box>
            <Grid container spacing={2} alignItems="center" sx={{ marginBottom: '10px' }}>
              <Grid item xs={12} sm={2} md={2} />
              <Grid item xs={12} sm={4} md={4}>
                <Button variant="contained" color="primary" size="medium" onClick={handleAddTask}>
                  ADD MORE TASK
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
          </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Paper style={{ marginBottom: '10px' }}>
            <Box component="form" sx={{ flexGrow: 1, p: 2 }} noValidate autoComplete="off">

            <Card>
                    <CardHeader
                      sx={{ backgroundColor: '#c16262' }}
                      title={
                        <Typography
                          variant="h4"
                          align="center"
                          gutterBottom
                          sx={{ fontSize: '16px !important', fontWeight: 600 }}
                        >
                          Total Amount Details
                        </Typography>
                      }
                    />
                    <CardContent>
                        <Typography variant="body1">
                        <strong>Total Amount:</strong> ${totalAmount}
                        </Typography>
                    </CardContent>
                  </Card>
              </Box>
              </Paper>
          </Grid>
      </Grid>
    </Box>
  );
};

export default GroupTaskForm;
