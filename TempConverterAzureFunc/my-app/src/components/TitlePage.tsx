import React from "react";

interface TitlePageProps {
  title: string;
  icon: string;
}

const TitlePage: React.FC<TitlePageProps> = ({
  title,
  icon,
}: TitlePageProps) => {
  return (
    <div className="d-flex align-items-center mt-2 pb-3 border-bottom border-dark">
      <h5 className="me-4">{title}</h5>
      <i className={`${icon} fa-3x align-self-center`}></i>
    </div>
  );
};

export default TitlePage;
