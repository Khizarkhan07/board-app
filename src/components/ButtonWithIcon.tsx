import React from "react";

type buttonProps = {
  icon?: string ;
  text?: string ;
  color?: string ;
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const ButtonWIthIcon: React.FC<buttonProps> = ({
  icon,
  text,
  color,
  callback,
}) => {

  const styles = {
    background: color,
    width: '100%'
  }

  return (
    <button
      style={styles}
      onClick={callback}
      className="btn btn-light btn-outline mb-1"
    >
      {icon && <i className={icon + " mr-1"} style={{ color: "#fffff" }}/>}
      {text && <span>{text}</span>}
    </button>
  );
};
