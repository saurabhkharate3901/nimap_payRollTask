import React from "react";
import styles from "./Icons.module.scss";
import { Tooltip } from "@mui/material";

const Icons = ({ srcUrl, altText, tooltipText, size, cursorPointer, handleClick, id }) => {
  return (
    <Tooltip title={tooltipText || altText}>
      <img
        className={styles.overdueIcon}
        src={srcUrl}
        alt={altText || "icon with a tooltip"}
        style={{
            width: size,
            cursor: cursorPointer ? "pointer" : "default"
        }}
        onClick={handleClick}
      />
    </Tooltip>
  );
};

export default Icons;
