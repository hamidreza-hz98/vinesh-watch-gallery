"use client"

import { transformGridQuery } from '@/lib/request';
import QueryString from 'qs';
import React from 'react'
import Overview from '../common/overview/Overview';
import { contactFormColumns } from '@/constants/columns';
import ContactDrawer from '../ContactDrawer';
import { fetchWithAuth } from '@/lib/fetch';
import { contactApi } from '@/constants/api.routes';

const ContactPageWrapper = () => {
  
  const getContacts = async (params) => {
    try {
      
      const transformedQuery = transformGridQuery({ ...params });
            const query = QueryString.stringify(transformedQuery);
      
      const data = await fetchWithAuth(contactApi(query))
      
      return {
        items: data.contacts,
        rowCount: data.total,
      };
    } catch (error) {
       console.error("Failed to fetch products:", error);
      return {
        items: [],
        rowCount: 0,
      };
    }
  };
  
  return (
     <div>
         <Overview
           title="مدیریت فرم های تماس"
           breadcrumbs={[
             { name: "گالری ساعت وینش" },
             { name: "داشبورد", path: "/dashboard" },
             { name: "فرم های تماس" },
           ]}
           columns={contactFormColumns}
           getMany={getContacts}
           rowActions={["details"]}
           formMode="drawer"
           FormComponent={ContactDrawer}
         />
       </div>
  )
}

export default ContactPageWrapper