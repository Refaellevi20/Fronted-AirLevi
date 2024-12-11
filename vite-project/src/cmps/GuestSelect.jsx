import { Counter } from "./Counter"

export function GuestSelect({ onSetField, guests }) {

    function handleChange(field, value) {
        if (value <= 0) value = 0
        if (field === 'adults') {
            onSetField('guests', { ...guests, adults: value })
        }
        if (field === 'children') {
            onSetField('guests', { ...guests, children: value })
        }
        if (field === 'infants') {
            onSetField('guests', { ...guests, infants: value })
        }
        if (field === 'pets') {
            onSetField('guests', { ...guests, pets: value })
        }
    }

    const guestSelectOpts = [
        {
        label: 'Adults',
        subLabel: 'Ages 13 +',
        field: 'adults'
    },
    {
        label: 'Children',
        subLabel: 'Ages 2-12',
        field: 'children'
    },
    {
        label: 'Infants',
        subLabel: 'Under 2',
        field: 'infants'
    },
    {
        label: 'Pets',
        subLabel: <a href="">Bringing a Service  Animal?</a>, //! here on size page + open modal
        field: 'pets'
    }
]

    return (
        <div className='guest-select-list'>
        {guestSelectOpts.map((opt, idx) => {
            return (
                <div className="guest-select-row" key={idx}>
                    <div className="guest-select-label">
                        <div className="guest-select-label-header">{opt.label}</div>
                        <div className="guest-select-label-sub-header">{opt.subLabel}</div>
                    </div>
                        <Counter field={opt.field} value={guests[opt.field]} onChange={handleChange} />
                </div>
            )
        })}
        </div>)
}