import {
  Box,
  Grid,
  IconButton,
  TextField,
  Typography,
  Button,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import React from "react";

const SpecificationsField = ({ value = [], onChange, label }) => {
  const specs = value?.length ? value : [{ key: "", value: "" }];

  const handleChange = (index, field, val) => {
    const updated = [...specs];
    updated[index][field] = val;
    onChange(updated);
  };

  const addRow = () => {
    onChange([...specs, { key: "", value: "" }]);
  };

  const removeRow = (index) => {
    if (specs.length === 1) {
      onChange([{ key: "", value: "" }]);
      return;
    }
    const updated = specs.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <Box sx={{ border: "1px solid #ddd", borderRadius: 2, p: 2, mt: 2 }}>
      <Typography variant="subtitle1" fontWeight={600} mb={2}>
        {label}
      </Typography>

      {specs.map((item, index) => (
        <Grid container spacing={2} mb={1} key={index}>
          <Grid order={{ xs: 1, sm: 1 }} size={{ xs: 10, sm: 5 }}>
            <TextField
              label="کلید"
              size="small"
              fullWidth
              value={item.key}
              onChange={(e) => handleChange(index, "key", e.target.value)}
            />
          </Grid>

          <Grid order={{ xs: 3, sm: 2 }} size={{ xs: 12, sm: 6 }}>
            <TextField
              label="مقدار"
              size="small"
              fullWidth
              value={item.value}
              onChange={(e) => handleChange(index, "value", e.target.value)}
            />
          </Grid>

          <Grid order={{ xs: 2, sm: 3 }} size={{ xs: 1 }}>
            <Tooltip title="حذف سطر">
              <IconButton color="error" onClick={() => removeRow(index)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      ))}

      <Grid
        size={{ xs: 12 }}
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        mt={2}
      >
        <Button variant="outlined" startIcon={<AddIcon />} onClick={addRow}>
          افزودن مورد جدید
        </Button>
      </Grid>
    </Box>
  );
};

export default SpecificationsField;
