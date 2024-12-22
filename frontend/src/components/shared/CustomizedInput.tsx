import React from "react";
import TextField from '@mui/material/TextField';

type Props = {
    name: string;
    type: string;
    label: string;
};

const CustomizedInput = (props: Props) => {
    return (
        <TextField
            margin="normal"
            InputLabelProps={{
                style: { color: "white", fontSize: 20 }, // Customizes the label style
            }}
            InputProps={{
                style: { color: "white" }, // Customizes the input text style
            }}
            name={props.name}
            label={props.label}
            type={props.type}
        />
    );
};

export default CustomizedInput;