
import { gql, useQuery } from '@apollo/client'
import { Checkbox, List, ListItem } from '@chakra-ui/react'

export const AllTasksQuery = gql`
  query {
    tasks {
      id
      title
      done
    }
  }
`

const TaskList = () => {
  const { data, loading, error } = useQuery(AllTasksQuery)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <List>
      {data.tasks.map((task: any) => (
        <ListItem key={task.id}>
          <Checkbox colorScheme='teal' isChecked={task.done}>
            {task.title}a
            </Checkbox>
        </ListItem>
      ))}
    </List>
  )
}

export default TaskList
