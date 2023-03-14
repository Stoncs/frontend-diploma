import { FormattedMessage } from "react-intl";
import styles from "./inputRegister.scss";

type InputRegisterProps = {
  id: string;
  placeholder: string;
  type: string;
  register: Object;
  errorMessageId: string | undefined;
  required?: boolean;
};

export default function InputRegister({
  id,
  placeholder,
  type,
  register,
  errorMessageId,
  required,
}: InputRegisterProps) {
  return (
    <div className={styles.input}>
      {required ? (
        <p className={styles.required}>
          <FormattedMessage id="fieldIsRequired" />
        </p>
      ) : (
        ""
      )}
      <input type={type} id={id} placeholder={placeholder} {...register} />
      {errorMessageId ? (
        <p className={styles.error}>
          <FormattedMessage id={errorMessageId} />
        </p>
      ) : (
        ""
      )}
    </div>
  );
}
