import React from "react";

interface Props {
  className: string;
  children: React.ReactNode;
  disabled?: boolean
}

const Button = ({ className, children , disabled }: Props) => {
  return <button disabled={disabled} className={className}>{children}</button>;
};

export default Button;
