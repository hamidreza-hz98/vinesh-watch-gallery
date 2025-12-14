"use client"

import Loader from '@/components/common/Loader';
import dynamic from 'next/dynamic';
import React from 'react'

const SettingsPageWrapper = dynamic(
  () => import('@/components/wrappers/SettingsPageWrapper'),
  {
    ssr: false,
    loading: () => <Loader />,
  }
);

const page = () => {
  return (
    <SettingsPageWrapper />
  )
}

export default page