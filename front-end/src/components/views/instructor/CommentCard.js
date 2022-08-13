import React from 'react'
import Commenter from './Commenter'

function CommentCard(props) {
  return (
    <div className='comment-card'>
        <img src={props.thumbPath} alt='img commented on' />
        { props.commenters.map(commenter => <Commenter key={commenter.id} name={commenter.name} comment={commenter.comment} avatar={commenter.avatar} />) }
    </div>
  )
}

export default CommentCard