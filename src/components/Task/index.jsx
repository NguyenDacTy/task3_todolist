import React from 'react'
import './style.scss'
import { generatePath, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import { TASK_STATUS } from '../../constants/task.constant'


const Task = (props) => {

  const navigate = useNavigate()

  const handleRedirectToDetailPage = () => {
    const taskId = props.task.id
    // generatePath sẽ tạo ra 1 path + thay thế pẩm /:[key] dựa vào key mình truyền vào , key dưới đây là id
    navigate(generatePath(ROUTES.UPDATE_TASK, { id: taskId}))
  }

  const computedStatusColor = (status) => {
    switch (status) {
      case TASK_STATUS.NEW:
        return "blue";

      case TASK_STATUS.DOING:
        return "yellow"

      case TASK_STATUS.DONE:
        return "green"
    
      default:
        return "green";
    }
  }

  return (
    <div className='task-container'>
        <div className='task-container__title' 
          onClick={handleRedirectToDetailPage}>
          Title: {props.task.title}
        </div>
        <div className='task-container__author'>Creator: {props.task.creator}</div>
        <div className='task-container__status'
          style={{
            color: computedStatusColor(props.task.status)
          }}
        >Status: {props.task.status}</div>
        <div className='task-container__divider'></div>
        <div className='task-container__discription'>
            <div className='task-container__dis-title'>Description</div>
            <div className='task-container__dis-content'>
              {props.task.description}
            </div>
        </div>
    </div>
  )
}

export default Task