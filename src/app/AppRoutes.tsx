
import { Navigate, Route, Routes } from "react-router-dom";

import { Login } from "../features/auth/pages/Login";
import { EndUser } from "../features/end-user/components/EndUser";
import { Enterprise } from "../features/enterprise/components/Enterprise";
import { Zone } from "../features/zone/components/Zone";
import { Meters } from "../features/end-user/pages/Meters";
import { DashboardLayout } from "../shared/components/DashboardLayout";
import { MyBills } from "../features/end-user/pages/MyBills";
export const AppRoutes = () => {
  return (
    <Routes>

      {/* Login page */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      {/* End User pages */}
      <Route
        path="/end-user/meters"
        element={
          <DashboardLayout title="My Meters">
            <Meters />
          </DashboardLayout>
        }
      />

      <Route path="/end-user/bills" element={ <DashboardLayout title="My Bills">
      <MyBills />
    </DashboardLayout>
  }
/>

      {/* Other role pages */}
      <Route path="/zone" element={<Zone />} />
      <Route path="/enterprise" element={<Enterprise />} />

      {/* Unknown URL redirects to Login */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
};
