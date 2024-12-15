import React from 'react'
import moment from 'moment'

export function HostedSmallDetails({ host }) {
    if (!host) {
        return <p>Host details not available.</p>
    }

    const createAtFormatted = moment(host.createAt)
    const timeAgo = createAtFormatted.fromNow(true)

    return (
        <section className=''>
            <div style={{ display: 'flex', alignItems: 'center', padding: '24px 0px', gap: '10px', borderTop: '1px solid #DDDDDD', borderBottom: '1px solid #DDDDDD' }}>
                <img
                    src={host.imgUrl}
                    alt={`${host.fullname}'s avatar`}
                    style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                />
                <div style={{ lineHeight: 1.25 }}>
                    <h4 className='fs16'> Hosted by {host.sortName}</h4>
                    <h4 className='fs14'>{timeAgo} hosting</h4>
                </div>
            </div>
        </section>
    )
}
