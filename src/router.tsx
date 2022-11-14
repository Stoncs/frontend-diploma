import { Route, Routes } from "react-router";

import { EmptyLayout } from "./view/layouts/empty/empty.layout";
import { MainLayout } from "./view/layouts/main/main.layout";
import { Empty } from "./view/pages/empty/empty.component";
import { NotFoundPage } from "./view/pages/not-found/not-found.component";
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
        <Route path="/" element={<Rules />} />
        <Route path="/redux" element={<Redux />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="sign-up" element={<SingUp />} />
      <Route path="sign-in" element={<SignIn />} />
    </Routes>
  </>
);
