import React, { useEffect, useState } from 'react'
import CurrentToken from './CurrentToken'
import { Api } from '../../../Utils/Api'
import TokenCard from './TokenCard'
//import * as signalR from '@microsoft/signalr';

const CatchAllCounter = () => {

  return (
    <div>
        <CurrentToken />
        
    </div>
  )
}

export default CatchAllCounter