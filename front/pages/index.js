import Head from 'next/head'
import Image from 'next/image'
import Container from '@mui/material/Container'
import { Box, Button, Checkbox, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { useEffect, useState } from 'react';


export default function Home() {
  const [data, setData] = useState([])
  const [title, setTitle] = useState()
  const [desc, setDesc] = useState()
  const [count, setCount] = useState(0)
  useEffect(() => {
    setData([
      {
        id: 1,
        title: 'Test',
        description: 'this is description'
      },
      {
        id: 2,
        title: 'Test',
        description: 'this is description'
      },
    ])
    setCount(2)

    return () => { }
  }, [])



  function handleAddToDo(e) {
    e.preventDefault()
    let temp = [...data]
    let tempCount = ++count

    setData([...data, { id: count, title: title, description: desc }])
    setCount(tempCount)
  }

  function deleteItem(id) {
    var filtered = data.filter(function (value, index, arr) {
      return value.id != id;
    });
    setData(filtered)
  }

  console.log(data)
  return (
    <div>
      <Head>
        <title>To Do List App</title>
        <meta name="description" content="Simple to do list" />
      </Head>

      <main>
        <Typography variant='h1'>Simple To Do List</Typography>

        <Container>
          <Grid container spacing={2}>
            <Grid item>
              <Box>
                <TextField
                  id="todolist-id"
                  label="To Do"
                  onChange={(e) => { setTitle(e.target.value) }}
                />
                <TextField
                  id="todolist-id"
                  label="Description"
                  onChange={(e) => { setDesc(e.target.value) }}
                />
                <Button sx={{ m: 2 }} onClick={handleAddToDo}>
                  + Add
                </Button>
              </Box>

              <List dense>
                {data.map((val, idx) => {
                  return (<ListItem
                    key={idx}
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete" onClick={() => deleteItem(val.id)}>
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <Checkbox />
                    <ListItemText
                      primary={val.title}
                      secondary={val.description}
                    />
                  </ListItem>)
                })
                }
              </List>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  )
}
