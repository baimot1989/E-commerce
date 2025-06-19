
import { Box } from "@mui/material";

const Dots = ({ content, index }) => {
    return (
        <Box sx={{ display: "flex", gap: 1 }}>
          {content.map((_, i) => (
            <Box
              key={i}
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: index === i ? "primary.main" : "grey.400",
                transition: "background-color 0.3s ease"
              }}
            />
          ))}
        </Box>
      );
}
 
export default Dots;
