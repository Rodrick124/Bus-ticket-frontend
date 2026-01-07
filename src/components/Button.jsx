import React from 'react'

export default function Button({children, variant='primary', ...props}){
  const base = 'px-4 py-2 rounded-md font-semibold transition-shadow'
  const styles = variant === 'primary'
    ? `${base} bg-primary text-white hover:shadow-md`
    : `${base} bg-white border text-primary hover:bg-primary/5 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600`
  return <button className={styles} {...props}>{children}</button>
}
