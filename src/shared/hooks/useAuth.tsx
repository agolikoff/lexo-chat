import { useActionCreators } from "./useActionCreators";
import { signInAction, authActions, isAuthSelector } from "../../store/auth";
import { googleLogout, type CredentialResponse, useGoogleOneTapLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../shared/hooks";
import { AppRoutes } from "../../shared/constants/routes";

export function useAuth({ navigateAfterSuccess }: { navigateAfterSuccess?: string } = {}) {
  const actions = useActionCreators({ signInAction, ...authActions });
  const navigation = useNavigate();

  const isAuth = useAppSelector(isAuthSelector);

  useGoogleOneTapLogin({
    disabled: isAuth,
    onSuccess: (response: CredentialResponse) => {
      if (response?.credential) {
        actions.signInAction({ login: response.credential });
        if (navigateAfterSuccess) {
          navigation(navigateAfterSuccess);
        }
      }
    },
    onError: () => {
      googleLogout();
      actions.logout();
      navigation(AppRoutes.SIGN_IN);
    },
  });
}
