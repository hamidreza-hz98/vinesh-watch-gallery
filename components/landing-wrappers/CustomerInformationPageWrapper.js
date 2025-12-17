"use client"

import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CustomerInformationForm from '../forms/CustomerInformationForm'
import Loader from '../common/Loader'
import nookies from "nookies"
import { fetchWithAuth } from '@/lib/fetch'
import { modifyCustomerApi } from '@/constants/api.routes'

const CustomerInformationPageWrapper = () => {
  const { customer } = nookies.get()
  const [customerInfo, setCustomerInfo] = useState(null)
  const [ loading , setLoading ] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        const {data} = await fetchWithAuth(modifyCustomerApi(customer))
        
        setCustomerInfo(data)
      } catch (error) {
        console.log(error);
        
      } finally {
        setLoading(false)
      }
    }

    fetchData
  }, [customer])
  
  if(loading) {
    return <Loader />
  }

  return (
    <Box>
      <Typography variant='h3'>
        
        <CustomerInformationForm data={customerInfo} />
      </Typography>
    </Box>
  )
}

export default CustomerInformationPageWrapper