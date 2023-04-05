import React from 'react'

const TokenCard = () => {
  return (
    <div style={{
        backgroundColor:'white',
        padding : '1rem',
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        borderRadius:'5px',
        display:'flex',
        flexDirection:'column',
        // justifyContent: 'center',
        alignItems : 'center',
        height : '200px',
        justifyContent:'space-evenly',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px'
    }} >
        <h1>12324</h1>
        <div  style={{
           display:'flex',
           flexDirection:'column',
           alignItems:'center'
        }}>
        <h3 className='mb_1' >Selected Service</h3>
        <h3>Expected waiting time</h3>
        </div>

    </div>
  )
}

export default TokenCard