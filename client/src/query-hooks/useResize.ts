import { useState, useEffect } from 'react'

const PHONE_WIDTH = 500
const TABLET_WIDTH = 768
const LAPTOP_WIDTH = 1200

interface Resize {
  isPhone: boolean
  isTablet: boolean
  isLaptop: boolean
}

export const useResize = (): Resize => {
  const [isPhone, setIsPhone] = useState<boolean>(
    window.innerWidth < PHONE_WIDTH
  )
  const [isTablet, setIsTablet] = useState<boolean>(
    window.innerWidth < TABLET_WIDTH
  )
  const [isLaptop, setIsLaptop] = useState<boolean>(
    window.innerWidth < LAPTOP_WIDTH
  )

  const handleResize = (): void => {
    const newIsPhone = window.innerWidth <= PHONE_WIDTH
    const newIsTablet = window.innerWidth <= TABLET_WIDTH
    const newIsLaptop = window.innerWidth <= LAPTOP_WIDTH
    if (newIsPhone !== isPhone) setIsPhone(newIsPhone)
    if (newIsTablet !== isTablet) setIsTablet(newIsTablet)
    if (newIsLaptop !== isLaptop) setIsLaptop(newIsLaptop)
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => { window.removeEventListener('resize', handleResize) }
  }, [isPhone, isTablet, isLaptop])

  return { isPhone, isTablet, isLaptop }
}
