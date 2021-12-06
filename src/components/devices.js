import React from "react";

function Devices(props) {
  return (
    <tr>
      <th scope="row">{props.id}</th>
      <td>{props.device.id}</td>
      <td>{props.device.name}</td>
      <td>{props.device.desired.value.toString()}</td>
    </tr>
  );
}

export default Devices;
