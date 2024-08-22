import React, { useState } from 'react';
import {
  Grid,
  Box,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Divider,
  Card,
  CardContent,
  CardHeader
} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import {v4 as uuidv4} from 'uuid';
// import AddIcon from '@mui/icons-material/Add';
// import ModeIcon from '@mui/icons-material/Mode';
// import DeleteIcon from '@mui/icons-material/Delete';

interface Groups {
  [key: string]: string[];
}

interface TaskDetails {
    id : string|number,
    task: string,
    quantity: number|string,
    rate: number|string,
}


const GroupTaskForm: React.FC = () => {
  const [groupName, setGroupName] = useState<string>('');
  const [task, setTask] = useState<string>('');
  const [groups, setGroups] = useState<Groups>({});
  const [quantity,setQuantity] = useState<string>('');
  const [rate,setRate] = useState<string>('');
  const [addMoreTask,setAddMoreTask] = useState<TaskDetails>();

  const isEmptyObject = (obj: object): boolean => {
    return Object.keys(obj).length === 0;
  };

  const handleCreateGroup = (): void => {
    console.log(groupName);
    console.log(groupName.trim());
    if (groupName.trim()) {
      setGroups({ ...groups, [groupName]: [] });
      setGroupName('');
    }
  };

  //add new form field for adding more tasks
//   const handleAddTask = (): void => {
//     setAddMoreTask({...addMoreTask,['abc']:[...addMoreTask['group'],{id: uuidv4(), task: task, quantity: quantity, rate: rate}]});

//     // if (id.trim() && task.trim()) {
//     //   Object.keys(TaskDetails).push({group : {task : task, quantity: quantity, rate: rate}})
//     //   setGroups({
//     //     ...groups,
//     //     [group]: [...groups[group], {task : task, quantity: quantity, rate: rate}],
//     //   });
//     //   setTask('');
//     // }
//   };

//   const handleChangeDetails = (group:string,index:number,event:any|SelectChangeEvent) => {
//         // Get the tasks array for the specific group
//         const tasksArray = addMoreTask.group;
//         console.log(index);

//         // Copy the tasks array and update the task at the specified index
//         const updatedTasksArray = tasksArray.map((taskDetail, i) =>
//             i === index ? { ...taskDetail, task: event.target.value } : taskDetail
//         );

//         // Update the state with the modified tasks array
//         setAddMoreTask({ ...addMoreTask, [group]: updatedTasksArray });
//   }

//   const handleChange = (group:string,index:number,event: ) => {
//     const updatedTasks = [...addMoreTask[group]];
//         updatedTasks[index] = {
//             ...updatedTasks[index],
//             quantity: event.target.value, // Update the task name
//         };
//         setAddMoreTask({
//             ...addMoreTask,
//             [group]: updatedTasks,
//         });
//   };

  // const handleEditTask = (group:string) : void => {
  //     if (task.trim()) {
  //       setGroups({
  //           ...groups,[group] : [...groups[group],task],
  //       });
  //       setTask('');
  //     }
  // }

  return (
     <Box
        alignItems="center"
        gap={4}
        p={2}
        >
      <Box>
      <Typography variant="h4" align="center" sx={{
        textDecoration: 'underline',
        textUnderlineOffset: '4px', // Adjust this value as needed
        fontWeight:600
      }}>
        CREATE GROUPS
      </Typography>
    </Box>
      <Grid container spacing={2}>
      <Grid item md={2} style={{marginTop:'20px'}}></Grid>
      <Grid item md={6} style={{marginTop:'20px'}}>
      <TextField
        fullWidth
        label="Group Name"
        size="small"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        margin="normal"
        variant="outlined"
        sx={{
            fontSize: '1rem',
            '& .MuiInputBase-root': {
              fontSize: '1rem',
            },
            '& .MuiFormLabel-root': {
              fontSize: '1rem',
            },
          }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateGroup}
        style={{ marginBottom: '20px' }}
      >
        Create Group
      </Button>
      </Grid>
      </Grid>
      <Divider />
    {isEmptyObject(groups) ?
      <Box>
      <Typography variant="h5" align="center" sx={{
        textDecoration: 'underline',
        textUnderlineOffset: '4px', // Adjust this value as needed
        fontWeight:600,
        marginTop: '20px'
      }}>
        NO GROUPS AND TASKS FOUND
      </Typography>
    </Box>
    :
    <>
    <Box>
    <Typography variant="h5" align="center" sx={{
    textDecoration: 'underline',
    textUnderlineOffset: '4px', // Adjust this value as needed
    fontWeight:600,
    marginTop: '20px'
    }}>
    GROUPS AND TASKS
    </Typography>
    </Box>
      <Grid container spacing={2} style={{ marginTop: '20px', padding: '10px' }}>
      <Grid item md={8}>
      {Object.keys(groups).map((group) => (
        <Paper key={group} style={{ marginBottom: '10px', padding: '8px' }}>
          <Typography variant="h4" align="center" gutterBottom sx={{fontSize:'20px !important',fontWeight:600,backgroundColor : '#c16262',padding: '8px 0px 8px 0px',borderRadius: '6px'}}>GROUP : &nbsp;{group}</Typography>
          {/* <List>
            {groups[group].map((task, index) => (
              <ListItem key={index}>
                <ListItemText primary={task} />
              </ListItem>
            ))}
          </List> */}

          <Box component="form" sx={{ flexGrow: 1, p: 2 }} noValidate autoComplete="off">
          { Object.entries(addMoreTask).map((taskDetail) => (
            <div>
        <Typography variant="h6" gutterBottom>
            {taskDetail}
        </Typography>
        <Typography variant="h6" gutterBottom>
            Enter Task Details
        </Typography>
        {Object.entries(addMoreTask).map((index,value) => (

        <Grid container spacing={2} alignItems="center" justifyContent="center" key={value}>
            <Typography variant="h6" gutterBottom>
          {index}
        </Typography>
            <Grid item xs={12} sm={3} md={3}>
            <TextField
                fullWidth
                label="Task Name"
                variant="outlined"
                value={taskDetail}
                name="task"
                //onChange={(event) => handleChangeDetails(group,index,event)}
                size="small"
            />
            </Grid>
        <Grid item xs={12} sm={3} md={3}>
        <FormControl variant="standard" sx={{ m: 2, minWidth: 250 }}>
        <InputLabel id="demo-simple-select-standard-label">Quantity</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={taskDetail}
          //onChange={(event) => handleChangeDetails(group,index,event)}
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
            value= {`${taskDetail}`}
            onChange={(e) => setRate(e.target.value)}
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={3} md={3} display="flex" justifyContent="flex-start">
          <Button variant="contained" color="primary" size="medium">
           ADD MORE TASK
          </Button>
        </Grid>
      </Grid>
      ))}
      </div>
      ))}
    </Box>
        </Paper>
      ))}
    </Grid>
    <Grid item md={4}>
    <Card>
    <CardHeader
    sx={{ backgroundColor : '#c16262'}}
    title=<Typography variant="h4" align="center" gutterBottom sx={{fontSize:'16px !important',fontWeight:600}}>
    Quantity and Amount Details Per Task
  </Typography>
     />
    <CardContent>
    </CardContent>
    </Card>
    </Grid>
    </Grid>
    </>}
    </Box>
  );
};

export default GroupTaskForm;
