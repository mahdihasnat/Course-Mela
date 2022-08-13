import { Container, List, ListItem, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import React from 'react'
import CommentCard from './CommentCard'

const comments = [
  { 
    id: 1, 
    title: "Motion-2.0", 
    teacher: "Hussain Mahbub", 
    thumbPath: require('../../../assets/coursethumb3.png'),
    commenters: [
      { id: 1, name: "Mushfiq", comment: "Helpful indeed!", avatar: require('../../../assets/pngegg2.png') }
    ]
  },
  { 
    id: 2, 
    title: "Statics", 
    teacher: "Aminul Islam", 
    thumbPath: require('../../../assets/coursethumb4.png'),
    commenters: [
      { id: 1, name: "Maria", comment: "Best course ever", avatar: require('../../../assets/pngegg.png') }
    ]
  },
]

// function CoTD() {
//   return (
//     <div className='cotd-container'>
//       <span style={{ fontSize: "1.7rem", fontWeight: "bold", marginTop: "20px", textShadow: "1px 1px red" }}>Comments of the Day</span>
//       <ul className='comment-cards'>
//         {
//           comments.map(comment => (
//             <li key={comment.id}>
//               <CommentCard title={comment.title} thumbPath={comment.thumbPath} commenters={comment.commenters} />
//             </li>
//           ))
//         }
//       </ul>
//     </div>
//   )
// }

function CoTD() {
  return (
    <Container sx={{ backgroundColor: "pink", borderRadius: "10px" }} >
      <Stack marginTop={5} bgcolor={"primary.main"} >
        <Stack bgcolor={"primary.main"} justifyContent="space-between" >
          <span style={{ fontSize: "1.7rem", fontWeight: "bold", marginLeft: "20px", marginTop: "20px", textShadow: "1px 1px red" }}>Comments of the Day</span>
        </Stack>

        <List>
          {
            comments.map(comment => (
              <ListItem key={comment.id}>
                <CommentCard title={comment.title} thumbPath={comment.thumbPath} commenters={comment.commenters} />
              </ListItem>
            ))
          }
        </List>
      </Stack>
    </Container>
  )
}


export default CoTD