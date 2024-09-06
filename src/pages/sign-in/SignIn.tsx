import { useEffect } from "react";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import { type CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useActionCreators, useAppSelector } from "../../shared/hooks";
import { signInAction, isAuthSelector } from "../../store/auth";
import { AppRoutes } from "../../shared/constants/routes";
import styles from "./SignIn.module.scss";

export function SignIn() {
  const actions = useActionCreators({ signInAction });
  const navigation = useNavigate();
  //
  const isAuth = useAppSelector(isAuthSelector);

  useEffect(() => {
    if (isAuth) {
      navigation(AppRoutes.LK_HOME);
    }
  }, [isAuth]);

  const onSuccess = (response: CredentialResponse) => {
    if (response?.credential) {
      actions.signInAction({ login: response.credential });
      navigation(AppRoutes.LK_HOME);
    }
  };
  const onError = () => {
    notification.error({
      message: "Error",
      description: "Authentication error",
    });
  };

  return (
    <div className={styles.signInPage}>
      <GoogleLogin auto_select onSuccess={onSuccess} onError={onError} />
    </div>
  );
}
