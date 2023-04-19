import React from "react";
import * as S from "./styled";
import { IErrorToastProps } from "../../../models/global-models/IErrorToastProps";

const ErrorToast: React.FC<IErrorToastProps> = ({
  errorMessage,
  onClose,
}: IErrorToastProps) => {
  return (
    <S.Container show={true} onClose={onClose}>
      <S.Header className="d-flex justify-content-between ms-auto">
        <strong>Ops!</strong>
      </S.Header>
      <S.Body>{errorMessage}</S.Body>
    </S.Container>
  );
};

export default ErrorToast;
