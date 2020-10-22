import React from "react";
import TaskBoard from "./TaskBoard";

function AllTasks(props) {
  return (
    <div>
      <div className="row bg-info p-2">
        <TaskBoard
          id="HighPriorityBoard"
          title="High Priority Tasks"
          priority="1"
          updateTaskClick={props.updateTaskClick}
        />

        <TaskBoard
          id="MediumPriorityBoard"
          title="Medium Priority Tasks"
          priority="2"
          updateTaskClick={props.updateTaskClick}
        />
        <TaskBoard
          id="LowPriorityBoard"
          title="Low Priority Tasks"
          priority="3"
          updateTaskClick={props.updateTaskClick}
        />
      </div>
    </div>
  );
}

export default AllTasks;
