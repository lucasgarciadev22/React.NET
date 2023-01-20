import React from "react";

export default function ActivityList(props) {
  return (
    <li key={props.act.id} className="list-group-item">
      <span style={{fontWeight:'bold'}}>{props.act.id}. {props.act.title}:</span> {props.act.description} - Priority: {props.act.priority}
    </li>
  );
}
