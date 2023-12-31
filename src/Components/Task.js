/* eslint-disable */
// hooked
import React from 'react';
import { formatDistance, subDays } from 'date-fns';
import PropTypes from 'prop-types';
import StartTimer from './Timer';
const _ = require('lodash');
import './Task.css'










const Task = function (props) {

    const tasks = props.tasks

    return tasks.map((el, idx) => {
      const { active, editing } = el;

      let gfg = _.uniqueId();

      return (
      
        <li className={active ? '' : editing ? 'not-active' : 'completed task-list'} id={el.id} key={idx}>
        
          <div className={editing ? 'not-active' : 'view'}>
            <input readOnly 
            checked={active ? '' : 'checked'} 
            className={'toggle'} type="checkbox" 
            onClick={() => props.taskCompleted(idx)} id={idx} />
            <label>
              <span className="title description">{el.value}</span>
              <StartTimer index = {idx} key={idx} mainState = {tasks} mins = {editing? el.minutes: null} secs = {editing? el.seconds: null}/>
              <span className='created'>{formatDistance(subDays(new Date(), 0), new Date())}</span>
            </label>
            <button className="icon icon-edit" 
            onClick={() => props.taskEdit(idx)}></button>
            <button className="icon icon-destroy"
             onClick={() => props.taskDelete(idx)}></button>
          </div>
          <input
            type="text"
            className={editing ? 'edited-text' : 'not-active'}
            id={gfg}
            defaultValue={el.value}
            onKeyUp={(e) => props.editState(e, idx)}
          />
          <input 
          type='number'
          id={gfg}
          defaultValue={el.minutes}
          onKeyUp={(e) => props.editMinutesState(e, idx)}
          className={editing ? 'new-todo-form__timer inputs edited-num-first' : 'new-todo-form__timer inputs not-active'}/>
          <input 
          type='number'
          id={gfg}
          defaultValue={el.seconds}
          onKeyUp={(e) => props.editSecondsState(e, idx)}
          className={editing ? 'new-todo-form__timer inputs edited-num-second' : 'new-todo-form__timer inputs not-active'}/>
        </li>
      );
    });
}

Task.defaultProps = {
  tasks: [],
};
Task.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object),
};
export default Task;