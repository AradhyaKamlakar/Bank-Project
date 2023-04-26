import React from 'react'

const TokenCard = ({token}) => {

  

  const getStatus = (id) => {
    switch  (id) {
        case 0:
            return "Pending";
        case 1:
            return "No Show";
        case 2:
            return "Being Served";
        case 3:
            return "Serviced";
        default:
            return "Abandoned"
    }
}

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
        <h1>{token.tokenNumber}</h1>
        <div  style={{
           display:'flex',
           flexDirection:'column',
           alignItems:'center'
        }}>
        <h3 className='mb_1' >{token.serviceName}</h3>
        <h3 className='mb_1' >{getStatus(token.status)}</h3>
        <h3>{token.waitingTime} min</h3>
        </div>

    </div>
  )
}

export default TokenCard