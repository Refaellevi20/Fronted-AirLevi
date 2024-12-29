import { useState, useEffect } from 'react'
import { orderService } from '../../services/order.service'
import { userService } from '../../services/user.service'
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service'

export function CreateGroupModal({ onClose, onCreateGroup }) {
  const [groupName, setGroupName] = useState('')
  const [selectedUsers, setSelectedUsers] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadOrderedUsers()
  }, [])

  async function loadOrderedUsers() {
    try {
      setIsLoading(true)
      // Get all orders
      const orders = await orderService.query()
      console.log('Fetched orders:', orders)

      if (!orders || orders.length === 0) {
        console.log('No orders found')
        setIsLoading(false)
        return
      }

      // Get unique buyers from orders
      const uniqueBuyers = orders.reduce((acc, order) => {
        if (order.buyer && !acc.some(user => user._id === order.buyer._id)) {
          acc.push(order.buyer)
        }
        return acc
      }, [])

      console.log('Unique buyers:', uniqueBuyers)
      setAllUsers(uniqueBuyers)
     
    } catch (err) {
      console.error('Failed to load users:', err)
      showErrorMsg('Failed to load users')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSubmit(ev) {
    ev.preventDefault()
    if (!groupName.trim()) {
      showErrorMsg('Please enter a group name')
      return
    }
    if (selectedUsers.length === 0) {
      showErrorMsg('Please select at least one member')
      return
    }
   
    const newGroup = {
      name: groupName,
      members: selectedUsers,
      createdAt: Date.now(),
      msgs: []
    }

    try {
      await onCreateGroup(newGroup)
      showSuccessMsg('Group created successfully')
      onClose()
    } catch (err) {
      console.error('Failed to create group:', err)
      showErrorMsg('Failed to create group')
    }
  }

  return (
    <div className="create-group-modal">
      <div className="modal-header">
        <h3>Create New Group</h3>
        <button className="close-btn" onClick={onClose}>&times;</button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="groupName">Group Name</label>
          <input
            id="groupName"
            type="text"
            placeholder="Enter group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            required
          />
        </div>
       
        <div className="user-selection">
          <h4>Select Members:</h4>
          {isLoading ? (
            <div className="loading">Loading users...</div>
          ) : allUsers.length === 0 ? (
            <div className="no-users">No users found with orders</div>
          ) : (
            <div className="users-list">
              {allUsers.map(user => (
                <label key={user._id} className="user-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user._id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedUsers([...selectedUsers, user._id])
                      } else {
                        setSelectedUsers(selectedUsers.filter(id => id !== user._id))
                      }
                    }}
                  />
                  <div className="user-info">
                    <img
                      src={user.imgUrl || 'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/3.jpg'}
                      alt={user.fullname}
                    />
                    <span>{user.fullname}</span>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="modal-actions">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={isLoading || !groupName.trim() || selectedUsers.length === 0}
          >
            Create Group
          </button>
        </div>
      </form>
    </div>
  )
}