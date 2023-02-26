import React, { ReactNode } from "react";

interface TitlePageProps {
  title: string;
  children?: ReactNode;
}

const TitlePage: React.FC<TitlePageProps> = ({
  title,
  children,
}: TitlePageProps) => {
  return (
    <div className="div d-flex justify-content-between align-items-end mt-2 pb-3 border-bottom border-dark">
      <h5>{title}</h5>
      {children}
    </div>
  );
};

export default TitlePage;