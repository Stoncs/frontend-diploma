import { Route, Routes } from "react-router";
import {
  CHANGE_PASSWORD_ROUTE,
  DEVICES_ROUTE,
  DEVICE_SETTINGS_ROUTE,
  LOGIN_ROUTE,
  PROFILE_ROUTE,
  REGISTRATION_ROUTE,
} from "./utils/consts";

import { EmptyLayout } from "./view/layouts/empty/empty.layout";
import { MainLayout } from "./view/layouts/main/main.layout";
import { DeviceSettings } from "./view/pages/device-settings/device-settings.component";
import { Devices } from "./view/pages/devices/devices.component";
import { Empty } from "./view/pages/empty/empty.component";
import { NotFoundPage } from "./view/pages/not-found/not-found.component";
import { PasswordChange } from "./view/pages/password-change/password-change.component";
import { PasswordRecovery } from "./view/pages/password-recovery/password-recovery";
import { Profile } from "./view/pages/profile/profile.component";
import { Redux } from "./view/pages/redux/redux.component";
import { Rules } from "./view/pages/rules/rules.component";
import SignIn from "./view/pages/sign-in/sign-in.component";
import SingUp from "./view/pages/sign-up/sign-up.component";

export const Router = () => (
  <>
    <Routes>
      <Route element={<EmptyLayout />}>
        <Route path="empty" element={<Empty />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route path="/redux" element={<Redux />} />
        <Route path="/" element={<Rules />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path={LOGIN_ROUTE} element={<SignIn />} />
      <Route path={REGISTRATION_ROUTE} element={<SingUp />} />
      <Route path="password-recovery" element={<PasswordRecovery />} />
      <Route path={CHANGE_PASSWORD_ROUTE} element={<PasswordChange />} />
      <Route path={PROFILE_ROUTE} element={<Profile />} />
      <Route path={DEVICES_ROUTE} element={<Devices />} />
      <Route path={DEVICE_SETTINGS_ROUTE} element={<DeviceSettings />} />
    </Routes>
  </>
);
