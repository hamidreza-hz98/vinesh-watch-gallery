"use client"

import React, { useCallback, useEffect } from 'react'
import Addresses from '../common/Addresses'
import { useDispatch } from 'react-redux'
import { getCustomerAddresses } from '@/store/address/address.actions'
import nookies from "nookies";

const CustomerAddressPageWrapper = () => {
  const dispatch = useDispatch()
  const { customer } = nookies.get();

  useEffect(() => {
    dispatch(getCustomerAddresses(customer))
  }, [dispatch, customer])

  return (
    <Addresses isInCart={false} controls={true} />
  )
}

export default CustomerAddressPageWrapper