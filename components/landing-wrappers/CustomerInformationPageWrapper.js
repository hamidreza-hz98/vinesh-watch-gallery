"use client"

import { Box, Typography } from '@mui/material'
import React from 'react'
import CustomerInformationForm from '../forms/CustomerInformationForm'
import { useSelector } from 'react-redux'
import { selectCustomer } from '@/store/customer/customer.selector'
import Loader from '../common/Loader'

const CustomerInformationPageWrapper = () => {
  const customer = useSelector(selectCustomer)
  
  if(!customer) {
    return <Loader />
  }

  return (
    <Box>
      <Typography variant='h3'>
        
        <CustomerInformationForm data={customer} />
      </Typography>
    </Box>
  )
}

export default CustomerInformationPageWrapper