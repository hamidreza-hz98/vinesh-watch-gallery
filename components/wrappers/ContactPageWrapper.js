"use client"

import { transformGridQuery } from '@/lib/request';
import { getAllContactForms } from '@/store/contact/contact.action';
import QueryString from 'qs';
import React from 'react'
import { useDispatch } from 'react-redux';
import Overview from '../common/overview/Overview';
import { contactFormColumns } from '@/constants/columns';
import ContactDrawer from '../ContactDrawer';

const ContactPageWrapper = () => {
   const dispatch = useDispatch();

  const getContacts = async (params) => {
    const query = transformGridQuery({ ...params });

    const data = await dispatch(
      getAllContactForms(QueryString.stringify(query, { encodedValuesOnly: true }))
    ).unwrap();

    return {
      items: data.contacts,
      rowCount: data.total,
    };
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