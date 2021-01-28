import React, { useEffect, useState } from 'react';
import Switch from "react-switch";
import secureAxios from '../api/core/apiClient';

export interface ButtonProps {
    _id: string,
    enabled: boolean
}

const EnableSwitch : React.FC<ButtonProps> = ({_id, enabled} : ButtonProps) => { {

    const [isEnabled, setEnabled] = useState(enabled);
    useEffect(() => {
        setEnabled(enabled);
    }, [enabled])

    const handleChange = (e: boolean) => {
        setEnabled(e)
        const data = {
            id: _id,
            status: e
        }
        secureAxios.post("/api/patients/status", data).then( (res) => {
            alert(`Status Changed!`);  
        }).catch( (err) => {
            alert('Failed to change patient status!');
        })
    }

    return (
      <Switch 
      onChange={e => handleChange(e)}
      checked={isEnabled}/>)

    }
  }
  
export default EnableSwitch;