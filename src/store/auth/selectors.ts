import { RootState } from "store";
import { createSelector } from "reselect";
import { jwtDecode, type JwtPayload } from "jwt-decode";

function authSelector(state: RootState) {
  return state.auth;
}

export const tokenSelector = createSelector([authSelector], (auth): string | null => auth.token);

export const isAuthSelector = createSelector([tokenSelector], (token) => !!token);

export const loadingLoginSelector = createSelector([authSelector], (auth) => auth.loadingLogin);

export const userSelector = createSelector(
  [tokenSelector],
  (token): (JwtPayload & { name?: string; email?: string; family_name?: string; given_name?: string }) | null => {
    return token ? jwtDecode(token) : null;
  },
);
