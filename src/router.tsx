import { Route, Routes } from "react-router";
import { useAppSelector } from "./redux/hooks";
import { MenuDetails, PopupDetails } from "./redux/types";
import {
  CHANGE_PASSWORD_ROUTE,
  DEVICES_ROUTE,
  DEVICE_SETTINGS_ROUTE,
  LOGIN_ROUTE,
  PROFILE_ROUTE,
  REGISTRATION_ROUTE,
} from "./utils/consts";
import MessagePopup from "./view/components/messagePopup/MessagePopup.component";

import { DeviceSettings } from "./view/pages/device-settings/device-settings.component";
import { Devices } from "./view/pages/devices/devices.component";

import { PasswordChange } from "./view/pages/password-change/password-change.component";
import { PasswordRecovery } from "./view/pages/password-recovery/password-recovery";
import { Profile } from "./view/pages/profile/profile.component";
import SignIn from "./view/pages/sign-in/sign-in.component";
import SingUp from "./view/pages/sign-up/sign-up.component";
import { Menu } from "./view/components/menu/Menu.component";

export const Router = () => {
  const popupInfo: PopupDetails = useAppSelector<PopupDetails>(
    (state) => state.popup
  );
  const menu: MenuDetails = useAppSelector<MenuDetails>((state) => state.menu);
  return (
    <>
      <Routes>
        <Route path={LOGIN_ROUTE} element={<SignIn />} />
        <Route path={REGISTRATION_ROUTE} element={<SingUp />} />
        <Route path="password-recovery" element={<PasswordRecovery />} />
        <Route path={CHANGE_PASSWORD_ROUTE} element={<PasswordChange />} />
        <Route path={PROFILE_ROUTE} element={<Profile />} />
        <Route path={DEVICES_ROUTE} element={<Devices />} />
        <Route path={DEVICE_SETTINGS_ROUTE} element={<DeviceSettings />} />
      </Routes>
      {popupInfo.header ? <MessagePopup {...popupInfo} /> : ""}
      {menu.visible ? <Menu /> : ""}
    </>
  );
};
