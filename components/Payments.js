"use client"

import useNotifications from '@/hooks/useNotifications/useNotifications'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import nookies from "nookies"
import { selectCart } from '@/store/cart/cart.selector'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'

const Payments = () => {
  const dispatch = useDispatch()
  const notifications = useNotifications()

  const {customer} = nookies.get()
  const cart = useSelector(selectCart)

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(cart?.payment?.bank || null)


  return (
   <Box display="flex" alignItems="center" justifyContent="flex-start" gap={2}>
        <Typography variant="h2">انتخاب درگاه پرداخت</Typography>

    
   </Box>
  )
}

export default Payments