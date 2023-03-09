import React from "react";
import { changeProfile, getUserProfile, sendEmail } from "~/http/api";
import { setUser } from "~/redux/actions/user";
import { useAppDispatch } from "~/redux/hooks";

type ProfileFieldProps = {
  name: string;
  title: string;
  initialValue: string;
  username: string;
};

// Компонент ProfileField
const ProfileField = ({
  name,
  title,
  initialValue,
  username,
}: ProfileFieldProps) => {
  const [available, setAvailable] = React.useState(false);
  const [value, setValue] = React.useState(initialValue);

  const fetchUserProfileInfo = async () => {
    const data = getUserProfile(username);
    return data;
  };
  React.useEffect(() => {
    try {
      fetchUserProfileInfo().then((data) => {
        console.log(data);
        // const dispatch = useAppDispatch();
        // dispatch(
        //   setUser({
        //     id: data.id,
        //     username: data.username,
        //     fullname: data.fullname,
        //     organisation: data.organisation,
        //     roles: data.roles,
        //     phoneNumber: data.phoneNumber,
        //   })
        // );
      });
    } catch (e) {
      alert(e);
    }
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
              const data = await changeProfile(name, value, username);
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
  const username = localStorage.getItem("username");
  const fullname = localStorage.getItem("fullname");
  const organisation = localStorage.getItem("organisation");
  const phoneNumber = localStorage.getItem("phoneNumber");

  const onClickResetPassword = () => {
    sendEmail(username!);
  };

  return (
    <div>
      <h1>Профиль</h1>
      <p>Почта</p>
      <p>{username}</p>
      <ProfileField
        name="fullname"
        title="Полное имя"
        initialValue={fullname!}
        username={username!}
      />
      <ProfileField
        name="organisation"
        title="Организация"
        initialValue={organisation!}
        username={username!}
      />
      <ProfileField
        name="phoneNumber"
        title="Номер телефона"
        initialValue={phoneNumber!}
        username={username!}
      />
      <p />
      <button onClick={onClickResetPassword}>Поменять пароль</button>
    </div>
  );
};
