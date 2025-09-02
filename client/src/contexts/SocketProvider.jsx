import React, { createContext, useContext, useEffect, useState } from 'react'
import io  from "socket.io-client"

const SocketContext=createContext()

export default function SocketProvider({id,children}) {

    const [socket,setSocket]=useState()

    useEffect(()=>{
        const newSocket=io('https://text-chat-app-of8p.onrender.com',{
            query:{id}
        });
        setSocket(newSocket)
        return ()=>newSocket.close()
    },[id])

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}

export function useSocket() {
    return useContext(SocketContext);
}
