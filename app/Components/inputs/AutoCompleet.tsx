import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, Typography } from "@mui/material";

interface InputProsp {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  maxLength?: number;
}

export default function AutocompleteInput({
  onBlur,
  onChange,
  placeholder,
  value,
  maxLength,
}: InputProsp) {
  const hint = React.useRef("");
  const [inputValue, setInputValue] = React.useState("");

  return (
    <Autocomplete
      onKeyDown={(event) => {
        if (event.key === "Tab") {
          if (hint.current) {
            setInputValue(hint.current);
            event.preventDefault();
          }
        }
      }}
      className="border-2 rounded-lg dark:border-zinc-800  dark:text-white text-black"
      onClose={() => {
        hint.current = "";
      }}
      onChange={(event, newValue) => {
        console.log(newValue)
        setInputValue(newValue && newValue.label ? newValue.label : "");
      }}
      
      inputValue={inputValue}
      id="combo-box-hint-demo"
      options={top100Films}
      renderInput={(params) => {
        return (
          <Box sx={{ position: "relative" }}>
            <Typography
              sx={{
                position: "absolute",
                opacity: 0.5,
                left: 14,
                top: 16,
                overflow: "hidden",
                whiteSpace: "nowrap",
                width: "100%" // Adjust based on padding of TextField
              }}
            >
              {hint.current}
            </Typography>
            <TextField
              {...params}
              onChange={(e) => {
                const newValue = e.target.value;

                setInputValue(newValue);
                const matchingOption = top100Films.find((option) =>
                  option.label.startsWith(newValue)
                );

                if (newValue && matchingOption) {
                  hint.current = matchingOption.label;
                } else {
                  hint.current = "";
                }
              }}
              label="Mensagem esperada"
            />
          </Box>
        );
      }}
      aria-placeholder={placeholder}
    />
  );
}

const top100Films = [
  { label: "@sys.input"},
];
