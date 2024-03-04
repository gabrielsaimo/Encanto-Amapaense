import { Button, Result } from "antd";
import React from "react";

const Error404 = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Desculpe, a página que você visitou não existe."
      extra={
        <Button type="primary" href="/">
          Voltar para o inicio
        </Button>
      }
    />
  );
};

export default Error404;
