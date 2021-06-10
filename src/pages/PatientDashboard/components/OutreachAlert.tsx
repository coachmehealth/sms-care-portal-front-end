import React from "react";
import secureAxios from "../../../api/core/apiClient";
import "remixicon/fonts/remixicon.css";

export interface OutreachProps {
  _id: string;
  outreachYesStatus: boolean;
  pending: boolean;
}

const OutreachAlert: React.FC<OutreachProps> = ({
  _id,
  outreachYesStatus,
  pending,
}: OutreachProps) => {
  const handleChange = () => {
    const confirmation = window.confirm("Did you call the patient?");
    if (confirmation) {
      const data = {
        id: _id,
        pending: !pending,
      };
      secureAxios
        .put("/api/patients/outreach/pending", data)
        .then((res) => {
          alert(`Status Changed!`);
          window.location.reload();
        })
        .catch((err) => {
          alert("Failed to change patient status!");
        });
    }
  };

  //If the outreach process has completed
  if (outreachYesStatus && !pending) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center" }}
        data-testid="return-div-checkmark"
      >
        <i
          className="fas fa-check"
          style={{ color: "black", fontSize: "28px" }}
        ></i>
      </div>
    );
  }

  return outreachYesStatus && pending ? (
    <div
      style={{ display: "flex", justifyContent: "center" }}
      onClick={handleChange}
      data-testid="return-div-exclamation"
    >
      <i
        style={{ color: "black", fontSize: "28px" }}
        className="fas fa-exclamation"
      ></i>
    </div>
  ) : (
    <div
      style={{ display: "flex", justifyContent: "center" }}
      data-testid="return-div-sleep"
    >
      <i style={{ fontSize: "32px" }} className="ri-zzz-line"></i>
    </div>
  );
};

export default OutreachAlert;
