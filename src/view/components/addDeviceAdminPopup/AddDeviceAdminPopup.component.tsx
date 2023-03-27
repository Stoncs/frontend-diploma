import { AxiosError, isAxiosError } from "axios";
import React, { Dispatch, SetStateAction } from "react";
import { useIntl } from "react-intl";
import { registerDevice } from "~/http/api";
import { setPopup } from "~/redux/actions/popup";
import { useAppDispatch } from "~/redux/hooks";
import styles from "./addDeviceAdminPopup.scss";

interface AddDeviceAdminPopupProps {
  setAddDeviceAdmin: Dispatch<SetStateAction<boolean>>;
}
export const AddDeviceAdminPopup = ({
  setAddDeviceAdmin,
}: AddDeviceAdminPopupProps) => {
  const [key, setKey] = React.useState("");
  const [name, setName] = React.useState("");
  const dispatch = useAppDispatch();
  const intl = useIntl();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (key === "" || name === "") {
      dispatch(
        setPopup({
          header: intl.formatMessage({ id: "error" }),
          message: "Ключ и название не должны быть пустыми",
          type: "error",
        })
      );
    } else {
      try {
        await registerDevice(key, name);
        dispatch(
          setPopup({
            header: "Успешно!",
            message: "Устройство зарегистрировано",
            type: "normal",
          })
        );
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error.response?.data.message);
          if (error.response?.data.message.includes("must not be null")) {
            dispatch(
              setPopup({
                header: intl.formatMessage({ id: "error" }),
                message: "Ключ и название не должны быть пустыми",
                type: "error",
              })
            );
          }
          if (error.response?.data.message.includes("already exists")) {
            dispatch(
              setPopup({
                header: intl.formatMessage({ id: "error" }),
                message: "Устройство с таким ключом или именем уже существует",
                type: "error",
              })
            );
          }
        } else {
          dispatch(
            setPopup({
              header: intl.formatMessage({ id: "error" }),
              message: intl.formatMessage({ id: "errUnexpected" }),
              type: "error",
            })
          );
        }
      } finally {
        setAddDeviceAdmin(false);
      }
    }
  };
  return (
    <>
      <div className={styles.container}>
        <form className={styles.content} onSubmit={onSubmit}>
          <h2>Добавить новое устройство</h2>
          <input
            className={styles.input}
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Ключ камеры"
          />
          <input
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Название"
          />
          <button className={styles.button}>Сохранить</button>
          <div className={styles.x}>x</div>
        </form>
      </div>
      <div className={styles.backdrop} />
    </>
  );
};
