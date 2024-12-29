import { useState } from 'react'
import { utilService } from '../../services/util.service'
// import { style } from '@mui/system'

export function GroupList({ groups, selectedGroup, onSelectGroup }) {
    const [searchTerm, setSearchTerm] = useState('')

    const filteredGroups = groups.filter(group =>
        group.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
// flex1 
    return (
        <aside  className="group-list ">
            <div className="group-list-header">
                <input
                    type="search"
                    placeholder="Search groups..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="group-search-input"
                />
            </div>

            <div className="groups-container">
                {filteredGroups.length === 0 ? (
                    <div className="no-groups-message">
                        {searchTerm ? 'No groups found' : 'No groups created yet'}
                    </div>
                ) : (
                    filteredGroups.map(group => (
                        <div
                            key={group._id}
                            className={`group-preview ${selectedGroup?._id === group._id ? 'selected' : ''}`}
                            onClick={() => onSelectGroup(group)}
                        >
                            <div className="group-preview-content">
                                <h4 className="group-name">{group.name}</h4>
                                <div className="group-info">
                                    <span className="member-count">
                                        {group.members.length} members
                                    </span>
                                    {group.msgs.length > 0 && (
                                        <span className="last-message-time">
                                            {utilService.timeAgo(group.msgs[group.msgs.length - 1].createdAt)}
                                        </span>
                                    )}
                                </div>
                                {group.msgs.length > 0 && (
                                    <p className="last-message">
                                        {group.msgs[group.msgs.length - 1].by.fullname}: {group.msgs[group.msgs.length - 1].txt}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </aside>
    )
}