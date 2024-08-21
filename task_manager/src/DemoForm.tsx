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
      IconButton,
    } from '@mui/material';
    import AddIcon from '@mui/icons-material/Add';
    import ModeIcon from '@mui/icons-material/Mode';
    import DeleteIcon from '@mui/icons-material/Delete';

    interface Groups {
      [key: string]: string[];
    }

    const DemoForm: React.FC = () => {
      const [groupName, setGroupName] = useState<string>('');
      const [task, setTask] = useState<string>('');
      const [groups, setGroups] = useState<Groups>({});

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

      const handleAddTask = (group: string): void => {
        if (task.trim()) {
          setGroups({
            ...groups,
            [group]: [...groups[group], task],
          });
          setTask('');
        }
      };

      const handleEditTask = (group:string) : void => {
          if (task.trim()) {
            setGroups({
                ...groups,[group] : [...groups[group],task],
            });
            setTask('');
          }
      }

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
              <Typography variant="h6">{group}</Typography>
              <List>
                {groups[group].map((task, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={task} />
                  </ListItem>
                ))}
              </List>
              <form style={{ display: 'flex', gap: '10px'}}>
              <TextField
                label="New Task"
                size="small"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="New Task"
                size="small"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="New Task"
                size="small"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="New Task"
                size="small"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                margin="normal"
                variant="outlined"
              />

              <IconButton>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAddTask(group)}
                >
                    Add More
                </Button>
              </IconButton>
              {/* <IconButton color="primary" onClick={() => handleEditTask(group)}>
              <ModeIcon />
              </IconButton>
              <IconButton color="primary" onClick={() => handleEditTask(group)}>
              <DeleteIcon />
              </IconButton> */}
              </form>

            </Paper>
          ))}
        </Grid>
        </Grid>
        </>}
        </Box>
      );
    };

export default DemoForm;
