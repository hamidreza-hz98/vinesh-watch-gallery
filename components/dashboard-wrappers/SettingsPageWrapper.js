"use client";

import { useParams } from "next/navigation";
import React from "react";
import PageContainer from "../common/PageContainer";
import { settingsInfo } from "@/constants/settings";
import GeneralSettingsForm from "../forms/settings/GeneralSettingsForm";
import DefaultSeoSettingsForm from "../forms/settings/DefaultSeoSettingsForm";
import TermsSettingsForm from "../forms/settings/TermsSettingsForm";
import FaqSettingsForm from "../forms/settings/FaqSettingsForm";
import AboutSettingsForm from "../forms/settings/AboutSettingsForm";
import { purifyData } from "@/lib/request";
import useNotifications from "@/hooks/useNotifications/useNotifications";
import Loader from "../common/Loader";
import { getSettingsSection, updateSettingsSection } from "@/app/actions/settings";

const SettingsPageWrapper = () => {
  const [settings, setSettings] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const { section } = useParams();
  const notifications = useNotifications();

  const loadData = React.useCallback(async () => {
    try {
      setLoading(true);

      const { settings } = await getSettingsSection(section);

      setSettings(settings);
    } catch (error) {
      notifications.show("خطا در بارگذاری تنظیمات", {
        severity: "error",
        autoHideDuration: 3000,
      });
    } finally {
      setLoading(false);
    }
  }, [section, notifications]);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  const sectionForms = {
    general: GeneralSettingsForm,
    "default-seo": DefaultSeoSettingsForm,
    terms: TermsSettingsForm,
    faq: FaqSettingsForm,
    about: AboutSettingsForm,
  };

  const FormComponent = sectionForms[section];

  if (!FormComponent) return <div>تنظیماتی یافت نشد!</div>;

  const handleUpdateSettings = async (data) => {
    try {
      const body = purifyData(data, settingsInfo[section].dataToPurify || []);

      const { message } = await updateSettingsSection(section, { [`${section}`]: body } )
      

      notifications.show(message, {
        severity: "success",
        autoHideDuration: 3000,
      });
    } catch (error) {
      notifications.show(error.message, {
        severity: "error",
        autoHideDuration: 3000,
      });
    }
  };

  if (loading || !settings) {
    return <Loader />;
  }

  return (
    <PageContainer
      title={settingsInfo[section].title}
      breadcrumbs={[
        { name: "گالری ساعت وینش" },
        { name: "داشبورد", path: "/dashboard" },
        { name: settingsInfo[section].title, path: `/dashboard/${section}` },
      ]}
    >
      <FormComponent
        data={settings || null}
        onSubmit={handleUpdateSettings}
      />
    </PageContainer>
  );
};

export default SettingsPageWrapper;
