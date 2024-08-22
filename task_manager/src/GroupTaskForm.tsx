import React, { useState } from 'react';
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
import Select from '@mui/material/Select';
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
  const [countTask, setCounttask] = useState<number>(0);

  const handleCreateGroup = (): void => {
    if (groupName.trim()) {
      setGroups({ ...groups, [groupName]: [] });
      setGroupName('');
    }
  };

  const handleAddTask = (): void => {
    setAddMoreTask([...addMoreTask, { id: countTask, task: '', quantity: '', rate: '' }]);
    setCounttask(countTask + 1);
  };

  const handleTaskChange = (index: number, field: keyof TaskDetails, value: string) => {
    const updatedTasks = [...addMoreTask];
    updatedTasks[index] = {
      ...updatedTasks[index],
      [field]: value,
    };
    setAddMoreTask(updatedTasks);
  };

  return (
    <Box alignItems="center" gap={4} p={2}>
      <Box>
        <Typography
          variant="h4"
          align="center"
          sx={{
            textDecoration: 'underline',
            textUnderlineOffset: '4px',
            fontWeight: 600,
          }}
        >
          CREATE GROUPS
        </Typography>
      </Box>

      <Divider />

      <Grid container spacing={2} style={{ marginTop: '20px' }}>
        <Grid item md={8}>
          <Paper style={{ marginBottom: '10px' }}>
            <Box component="form" sx={{ flexGrow: 1, p: 2 }} noValidate autoComplete="off">
              {countTask > 0 &&
                addMoreTask.map((task, index) => (
                  <Grid container spacing={2} alignItems="center" key={index}>
                    <Grid item xs={12} sm={3} md={3}>
                      <TextField
                        fullWidth
                        label="Task Name"
                        variant="outlined"
                        value={task.task}
                        onChange={(e) => handleTaskChange(index, 'task', e.target.value)}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={3} md={3}>
                      <FormControl variant="standard" sx={{ m: 2, minWidth: 250 }}>
                        <InputLabel id={`quantity-label-${index}`}>Quantity</InputLabel>
                        <Select
                          labelId={`quantity-label-${index}`}
                          id={`quantity-select-${index}`}
                          value={task.quantity}
                          onChange={handleTaskChange(index,'quantity',SelectChangeEvent)}
                          //onChange={(e) => handleTaskChange(index, 'quantity', e.target.value)}
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
                    <Grid item xs={12} sm={3} md={3}>
                      <TextField
                        fullWidth
                        label="Rate in $(dollars)"
                        variant="outlined"
                        value={task.rate}
                        onChange={(e) => handleTaskChange(index, 'rate', e.target.value)}
                        size="small"
                      />
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
        <Grid item md={4}>
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
            <CardContent></CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GroupTaskForm;
