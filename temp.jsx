/*
 * @Author: 卢天宇
 * @Date: 2023-08-15 15:26:11
 * @Description: 
 */
import React from 'react'

function useCustomHooks(url, options){
  fetch(url, options)
}

export default function temp() {
  useCustomHooks('url', {
    method: "GET",
    data: {
      name: 'xx'
    }
  })
  
  return (
    <div>temp</div>
  )
}
