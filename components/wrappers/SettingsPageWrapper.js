"use client";

import { getSettings, updateSettings } from "@/store/settings/settings.actions";
import { selectSettings } from "@/store/settings/settings.selector";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PageContainer from "../common/PageContainer";
import { settingsInfo } from "@/constants/settings";
import GeneralSettingsForm from "../forms/settings/GeneralSettingsForm";
import DefaultSeoSettingsForm from "../forms/settings/DefaultSeoSettingsForm";
import TermsSettingsForm from "../forms/settings/TermsSettingsForm";
import FaqSettingsForm from "../forms/settings/FaqSettingsForm";
import AboutSettingsForm from "../forms/settings/AboutSettingsForm";
import { purifyData } from "@/lib/request";
import useNotifications from "@/hooks/useNotifications/useNotifications";

const SettingsPageWrapper = () => {
  const dispatch = useDispatch();
  const { section } = useParams();
  const notifications = useNotifications();

  const settings = useSelector(selectSettings);

  const loadData = async () => {
    await dispatch(getSettings(section)).unwrap();
  };

  React.useEffect(() => {
    loadData();
  }, [dispatch, section]);

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


      const { message } = await dispatch(
        updateSettings({
          body: { [`${section}`]: body }, section,
        })
      ).unwrap();

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

  return (
    <PageContainer
      title={settingsInfo[section].title}
      breadcrumbs={[
        { name: "گالری ساعت وینش" },
        { name: "داشبورد", path: "/dashboard" },
        { name: settingsInfo[section].title, path: `/dashboard/${section}` },
      ]}
    >
      <FormComponent data={settings || null} onSubmit={handleUpdateSettings} />
    </PageContainer>
  );
};

export default SettingsPageWrapper;
