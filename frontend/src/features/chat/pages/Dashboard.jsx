import React from 'react'
import { useSelector } from "react-redux"
import { useChat } from '../hooks/useChat'

const Dashboard = () => {

    useChat()

    const { user } = useSelector(state => state.auth)

    console.log(user)

    return (
        <div>Dashboard</div>
    )
}

export default Dashboard