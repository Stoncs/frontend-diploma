import React, { FormEvent } from "react";
import { sendEmail } from "~/http/api";

export const PasswordRecovery = () => {
  const [email, setEmail] = React.useState("");

  // Если успешно, выводить, что сообщение отправлено
  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendEmail(email);
  };

  return (
    <div>
      <h1>Восстановление пароля</h1>
      <form method="post" onSubmit={(e) => onFormSubmit(e)}>
        <p>Введите адрес электронной почты</p>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
        <input type="submit" value="Отправить ссылку" />
      </form>
    </div>
  );
};
