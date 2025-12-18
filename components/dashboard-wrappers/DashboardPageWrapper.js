"use client";

import React, { useEffect, useState } from "react";
import PageContainer from "../common/PageContainer";
import SummaryCards from "../dashboard/DashboardSummaryCard";
import RevenueChart from "../dashboard/RevenueChart";
import { Grid } from "@mui/material";
import TopProducts from "../dashboard/TopProducts";
import LatestOrders from "../dashboard/LatestOrders";
import Loader from "../common/Loader";
import { useSearchParams } from "next/navigation";
import { getDashboardData } from "@/app/actions/dashboard";

const DashboardPageWrapper = () => {
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "processing";

  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);

      setError(null);
      try {
        const { data } = await getDashboardData(status)

        setDashboard(data);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError(err.message || "مشکلی پیش آمد.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [status, searchParams]);

  if (loading) return <Loader />;

  if (error)
    return (
      <PageContainer title="داشبورد مدیریت فروشگاه">
        <p>{error}</p>
      </PageContainer>
    );

  return (
    <PageContainer title="داشبورد مدیریت فروشگاه">
      <Grid container mt={4} spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <SummaryCards dashboard={dashboard} />
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <RevenueChart orderRevenueData={dashboard?.orderRevenueData} />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <LatestOrders orders={dashboard?.orders} />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TopProducts
            title="پربازدیدترین محصولات"
            data={dashboard?.mostVisitedProducts}
            suffix="visits"
            suffixLabel="بازدید"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TopProducts
            title="پرفروش‌ترین محصولات"
            data={dashboard?.mostSoldProducts}
            suffix="soldNumber"
            suffixLabel="فروش"
          />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default DashboardPageWrapper;
