import React from 'react'

const TokenCard = ({token}) => {


    const getStatus = (id) => {
        switch  (id) {
            case 0:
                return "Pending";
            case 1:
                return "No Show";
            case 3:
                return "Being Served";
            case 4:
                return "Serviced";
            default:
                return "Abandoned"
        }
    }

  return (
    <div style={{
        marginTop:'1rem',
        padding:'1rem',
        width : '300px',
        backgroundColor:'white',
        borderRadius : '5px',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
        display:'flex',
        justifyContent : 'space-between',
        alignItems : 'center',
        margin:'1rem'
    }} >
        <h3> {token.tokenNumber} </h3>
        <h5> { getStatus(token.status)} </h5>
    </div>
  )
}

export default TokenCard
