import React from "react";
import { useParams } from "react-router";
import { changePassword } from "~/http/api";

export const PasswordChange = () => {
  const [newPassword, setNewPassword] = React.useState("");
  const { token } = useParams();

  return (
    <div>
      <h1>Введите новый пароль</h1>
      <form
        method="post"
        onSubmit={() => changePassword(newPassword, token || "")}
      >
        <p>Введите адрес электронной почты</p>
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
