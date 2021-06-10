import React from "react";
import secureAxios from "../../../api/core/apiClient";
import { Checkbox } from "antd";
import "remixicon/fonts/remixicon.css";
import "antd/dist/antd.css";

export interface CheckedProps {
  _id: string;
  outreachStatus: boolean;
}

const OutreachCheckbox: React.FC<CheckedProps> = ({
  _id,
  outreachStatus,
}: CheckedProps) => {
  const handleChange = () => {
    const data = {
      id: _id,
      outreach: !outreachStatus,
    };
    secureAxios
      .put("/api/patients/outreach/outreach", data)
      .then((res) => {
        alert(`Status Changed!`);
        window.location.reload();
      })
      .catch((err) => {
        alert("Failed to change patient status!");
      });
  };

  //If the outreach process has completed
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Checkbox onChange={handleChange} checked={outreachStatus} />
    </div>
  );
};

export default OutreachCheckbox;
