import React, { useEffect, useState } from "react";

function Devices(props) {
  const [id, setId] = useState(null);
  const [device, setDevice] = useState({
    id: 0,
    name: "",
    desired: { value: "", unit: "" },
  });

  useEffect(() => {
    setId(props.id);
    setDevice(props.device);
  }, [props.id, props.device, device]);

  return (
    <tr>
      <th scope="row">{id}</th>
      <td>{device.id}</td>
      <td>{device.name}</td>
      <td>{device.desired.value.toString()}</td>
    </tr>
  );
}

export default Devices;
