import React from "react";
import { useNavigate } from "react-router";

import { useAppDispatch } from "../../../redux/hooks";
import { MenuIcon } from "../../../view/components/menuIcon/MenuIcon.component";
import { LOGIN_ROUTE } from "../../../utils/consts";
import { setPopup } from "../../../redux/actions/popup";

import profile_icon from "./../../../assets/profile_icon.png";
import styles from "./profile.scss";

import { changeProfile, getUserProfile, sendEmail } from "~/http/api";

type ProfileFieldProps = {
  name: string;
  email: string;
  placeholder: string;
  pattern?: string;
};

// Компонент ProfileField
const ProfileField = ({
  name,
  email,
  placeholder,
  pattern,
}: ProfileFieldProps) => {
  const [value, setValue] = React.useState("");

  return (
    <div className={styles.profile_field}>
      <form>
        {pattern ? (
          <input
            placeholder={placeholder}
            pattern={pattern}
            value={value}
            onChange={(e) => {
              if (e.target) {
                setValue(e.target.value);
              }
            }}
          />
        ) : (
          <input
            placeholder={placeholder}
            value={value}
            onChange={(e) => {
              if (e.target) {
                setValue(e.target.value);
              }
            }}
          />
        )}

        <button
          type="submit"
          onClick={async () => {
            try {
              const data = await changeProfile(name, value, email);
              console.log(data);
            } catch (error) {
              alert(error);
            }
          }}
        >
          Сохранить
        </button>
      </form>
    </div>
  );
};

type ProfileInfo = {
  fullname: string | null;
  organisation: string | null;
  phoneNumber: string;
  username: string;
};

export const Profile = () => {
  const email = localStorage.getItem("email");

  const [profileInfo, setProfileInfo] = React.useState<ProfileInfo>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const fetchUserProfileInfo = async () => {
    try {
      const data = await getUserProfile(email!);
      setProfileInfo(data);
      return data;
    } catch (e) {
      alert(e);
      navigate(LOGIN_ROUTE);
    }
  };
  React.useEffect(() => {
    fetchUserProfileInfo();
  }, []);

  const onClickResetPassword = () => {
    try {
      sendEmail(email!);
      dispatch(
        setPopup({
          header: "Успешно!",
          message: "Вам на почту отправлено письмо для смены пароля",
          type: "normal",
        })
      );
    } catch {
      dispatch(
        setPopup({
          header: "Ошибка!",
          message: "Не получилось отправить письмо на почту",
          type: "error",
        })
      );
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate(LOGIN_ROUTE);
  };

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <h1>Профиль</h1>
        <div className={styles.profile__header}>
          <div className={styles.profile__icon}>
            <img src={profile_icon} />
          </div>
          <div className={styles.profile__info}>
            {profileInfo?.fullname ? <p>{profileInfo.fullname}</p> : ""}
            {profileInfo?.username ? <p>{profileInfo.username}</p> : ""}
            {profileInfo?.organisation ? <p>{profileInfo.organisation}</p> : ""}
            {profileInfo?.phoneNumber ? <p>{profileInfo.phoneNumber}</p> : ""}
          </div>
        </div>
        <div className={styles.profile__inputs}>
          <h2>Настройки профиля:</h2>
          <ProfileField
            placeholder="Полное имя"
            name="fullname"
            email={email!}
          />
          <ProfileField
            name="organisation"
            placeholder="Организация"
            email={email!}
          />
          <ProfileField
            name="phoneNumber"
            placeholder="Номер телефона"
            email={email!}
            pattern="^(8|\+7)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}"
          />
        </div>

        <div className={styles.profile__buttons}>
          <button onClick={onClickResetPassword}>Поменять пароль</button>
          <button onClick={logout}>Выйти</button>
        </div>

        <MenuIcon />
      </div>
    </div>
  );
};
