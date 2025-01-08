import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { GroupList } from '../cmps/chat/GroupList'
import { GroupChatRoom } from '../cmps/chat/GroupChatRoom'
import { CreateGroupModal } from '../cmps/chat/CreateGroupModal'
import { groupService } from '../services/group.service'
import { socketService } from '../services/socket.service'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { AppLogo } from '../cmps/app-logo'
import { NavMenu } from './nav-menu'
import { AppFooterMobileOrder } from '../cmps/AppFooterMobileOrder'

export function GroupChatPage() {
  const [groups, setGroups] = useState([]) 
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const loggedInUser = useSelector((storeState) => storeState.userModule.user)

  useEffect(() => {
    if (loggedInUser?.isOwner) {
      loadGroups()
    }
  }, [loggedInUser])

  async function loadGroups() {
    try {
      const loadedGroups = await groupService.query({ hostId: loggedInUser._id })
      setGroups(Array.isArray(loadedGroups) ? loadedGroups : [])
    } catch (err) {
      console.error('Failed to load groups:', err)
      showErrorMsg('Failed to load groups')
    }
  }

  async function handleCreateGroup(groupData) {
    try {
      const newGroup = {
        ...groupData,
        hostId: loggedInUser._id,
        members: [...groupData.members, loggedInUser._id],
        createdAt: Date.now()
      }

      const savedGroup = await groupService.create(newGroup)
      setGroups(prevGroups => [...prevGroups, savedGroup])
      setSelectedGroup(savedGroup)
     
      socketService.emit('group-created', savedGroup)
      showSuccessMsg('Group created successfully!')
      setIsCreateModalOpen(false)
    } catch (err) {
      console.error('Failed to create group:', err)
      showErrorMsg('Failed to create group')
    }
  }

  //^ Only allow owners to access this page
  if (!loggedInUser?.isOwner) {
    return <div className="unauthorized-message">Only hosts can access group chats</div>
  }

  return (
    <section>
       <header className='app-header main-layout flex' style={{ justifyContent: 'space-between' }}>
              <div className='header-logo-container'>
                <AppLogo />
              </div>
              <div className='spacer'></div>
              <div className='header-menu-container'>
                <NavMenu />
              </div>
            </header>
    <section className="group-chat-page">
      <div className="group-chat-header">
        <h2>Group Chats</h2>
        <button
          className="create-group-btn"
          onClick={() => setIsCreateModalOpen(true)}
        >
          Create New Group
        </button>
      </div>
     
      <div className="group-chat-container flex1">
        <GroupList
          groups={groups} 
          selectedGroup={selectedGroup}
          onSelectGroup={setSelectedGroup}
        />
        {selectedGroup && (
          <GroupChatRoom
            group={selectedGroup}
            loggedInUser={loggedInUser}
          />
        )}
      </div>

      {isCreateModalOpen && (
        <CreateGroupModal
          onClose={() => setIsCreateModalOpen(false)}
          onCreateGroup={handleCreateGroup}
          loggedInUser={loggedInUser}
        />
      )}
    </section>
    <AppFooterMobileOrder />
    </section>
  )
}
