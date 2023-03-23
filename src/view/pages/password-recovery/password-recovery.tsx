import React, { FormEvent } from "react";
import { sendEmail } from "~/http/api";
import { setPopup } from "~/redux/actions/popup";
import { useAppDispatch } from "~/redux/hooks";

export const PasswordRecovery = () => {
  const [email, setEmail] = React.useState("");
  const dispatch = useAppDispatch();
  // Если успешно, выводить, что сообщение отправлено
  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await sendEmail(email);
    dispatch(
      setPopup({
        header: "Успешно!",
        message: "Для восстановления пароля проверьте почу.",
        type: "normal",
      })
    );
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
