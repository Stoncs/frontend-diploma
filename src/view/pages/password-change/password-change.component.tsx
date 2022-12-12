import React, { FormEvent } from "react";
import { useParams } from "react-router";
import { changePassword } from "~/http/api";

export const PasswordChange = () => {
  const [newPassword, setNewPassword] = React.useState("");
  const { token } = useParams();
  console.log(token);
  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    changePassword(newPassword, token || "");
  };
  return (
    <div>
      <h1>Введите новый пароль</h1>
      <form method="post" onSubmit={(e) => onFormSubmit(e)}>
        <input
          type="password"
          name="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          autoFocus
        />
        <input type="submit" value="Изменить пароль" />
      </form>
    </div>
  );
};
