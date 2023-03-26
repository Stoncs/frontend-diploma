import React from "react";
import { changeProfile, getUserProfile, sendEmail } from "~/http/api";
import { setUser } from "~/redux/actions/user";
import { useAppDispatch } from "~/redux/hooks";

type ProfileFieldProps = {
  name: string;
  title: string;
  initialValue: string;
  email: string;
};

// Компонент ProfileField
const ProfileField = ({
  name,
  title,
  initialValue,
  email,
}: ProfileFieldProps) => {
  const [available, setAvailable] = React.useState(false);
  const [value, setValue] = React.useState(initialValue);

  const fetchUserProfileInfo = async () => {
    try {
      const data = getUserProfile(email);
      return data;
    } catch (e) {
      alert(e);
    }
  };
  React.useEffect(() => {
    fetchUserProfileInfo().then((data) => {
      console.log(data);
    });
  }, []);

  return (
    <div>
      <p>{title}</p>
      {available ? (
        <input
          value={value!}
          onChange={(e) => {
            if (e.target) setValue(e.target.value);
          }}
        />
      ) : (
        <input value={value!} disabled />
      )}
      {available ? (
        <button
          onClick={async () => {
            try {
              const data = await changeProfile(name, value, email);
              console.log(data);
            } catch (error) {
              alert(error);
            }

            setAvailable(!available);
          }}
        >
          Сохранить
        </button>
      ) : (
        <button onClick={() => setAvailable(!available)}>Изменить</button>
      )}
    </div>
  );
};

export const Profile = () => {
  const email = localStorage.getItem("email");
  const fullname = localStorage.getItem("fullname");
  const organisation = localStorage.getItem("organisation");
  const phoneNumber = localStorage.getItem("phoneNumber");

  const onClickResetPassword = () => {
    sendEmail(email!);
  };

  return (
    <div>
      <h1>Профиль</h1>
      <p>Почта</p>
      <p>{email}</p>
      <ProfileField
        name="fullname"
        title="Полное имя"
        initialValue={fullname!}
        email={email!}
      />
      <ProfileField
        name="organisation"
        title="Организация"
        initialValue={organisation!}
        email={email!}
      />
      <ProfileField
        name="phoneNumber"
        title="Номер телефона"
        initialValue={phoneNumber!}
        email={email!}
      />
      <p />
      <button onClick={onClickResetPassword}>Поменять пароль</button>
    </div>
  );
};
