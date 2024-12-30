import React, { useEffect, useState } from 'react';
import { userService } from '../services/user.service';

export function UserCounts() {
    const [userCounts, setUserCounts] = useState([])

    useEffect(() => {
        const fetchUserCounts = async () => {
            try {
                const counts = await userService.getAllUsers()
                console.log('count',counts)
                
                setUserCounts(counts)
            } catch (error) {
                console.error("Failed to fetch user counts:", error)
            }
        }

        fetchUserCounts()
    }, [])

    return (
        <div>
            {/* <h2>User Counts</h2> */}
            <ul>
                {userCounts.length > 0 ? (
                userCounts.map(user => (
                    <li key={user._id}>
                        {user.fullname}: {user.count}
                    </li>
                ))
            ) : (
                <li>no count</li>
           )}
            </ul>
        </div>
    )
}
