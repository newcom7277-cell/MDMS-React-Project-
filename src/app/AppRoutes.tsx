
import { Navigate, Route, Routes } from "react-router-dom";
import { MyProfile } from "../features/end-user/pages/MyProfile";
import { Login } from "../features/auth/pages/Login";
// import { EndUser } from "../features/end-user/components/EndUser";
import { MyMeters } from "../features/zone/pages/MyMeters";
import { Enterprise } from "../features/enterprise/components/Enterprise";
import { Zone } from "../features/zone/components/Zone";
import { Meters } from "../features/end-user/pages/Meters";
import { DashboardLayout } from "../shared/components/DashboardLayout";
import { MyBills } from "../features/end-user/pages/MyBills";
import { ZoneDashboard } from "../features/zone/pages/ZoneDashboard";
import { EndUserDashboard } from "../features/end-user/pages/EndUserDashboard";
import Customer from "../features/zone/pages/Customer";
export const AppRoutes = () => {
  return (
    <Routes>

      {/* Login page */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      {/* End User pages */}
      <Route path="/end-user/meters" element={ <DashboardLayout title="My Meters"> <Meters /></DashboardLayout>
        }
      />
      <Route
  path="/end-user/profile" element={ <DashboardLayout title="My Profile"> <MyProfile />
</DashboardLayout>
  }
/>
<Route path="/end-user/bills" element={ <DashboardLayout title="My Bills">
      <MyBills />
    </DashboardLayout>
  }
/>
<Route path="/end-user" element={ <DashboardLayout title="Dashboard"> <EndUserDashboard /> </DashboardLayout>
  }
/>
<Route
  path="/end-user" element={ <DashboardLayout title="Dashboard"><EndUserDashboard /> </DashboardLayout>}/>
      {/* Other role pages */}



      {/* this is zone adming Rout .............................................................................*/ }
      <Route path="/zone-admin/meters" element={<DashboardLayout title="My Meters"> <MyMeters /> </DashboardLayout>
  }
/>
{/* this is zone dasbord */}
<Route path="/zone-dashboard" element={ <DashboardLayout title="Zone Dashboard"> <ZoneDashboard />
    </DashboardLayout>
  }
/>
{/* this is zone customer */ }
<Route
  path="/zone/customer"
  element={
    <DashboardLayout title="Zone Customers">
      <Customer/>
    </DashboardLayout>
  }
/>

      
      <Route path="/zone" element={<Zone />} />
      <Route path="/enterprise" element={<Enterprise />} />

      {/* Unknown URL redirects to Login */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
};
