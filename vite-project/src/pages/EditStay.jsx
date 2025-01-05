import React, { useEffect, useState } from 'react';
import { StayDetails } from '../cmps/editStay/StayDetails'
import { LocationDetails } from '../cmps/editStay/LocationDetails'
import { HostDetails } from '../cmps/editStay/HostDetails'
import { Amenities } from '../cmps/editStay/Amenities'
import { ReviewStep } from '../cmps/editStay/ReviewStep'
import { stayService } from '../services/stay.service';
import { useNavigate, useParams } from 'react-router-dom';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service';

//^ this is on mark because it is with no style
export function EditStay() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [stayData, setStayData] = useState(stayService.getEmptyStay())
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!id) return
        loadStay()
    }, [id])

    async function loadStay() {
        try {
            const stay = await stayService.getById(id)
            setStayData(stay)
        } catch (err) {
            console.error('Error loading stay:', err);
            setError('Failed to load stay data.')
            showErrorMsg('Stay not found!')
            navigate('/stay')
        } finally {
            setLoading(false)
        }
    }

    function handleChange(updatedData) {
        setStayData((prevData) => ({ ...prevData, ...updatedData }))
    }

    function handleNextStep (){
        setStep((prevStep) => prevStep + 1)
    }

    function handlePreviousStep() {
        setStep((prevStep) => prevStep - 1)
    }

    async function handleSubmit(ev) {
        ev.preventDefault()
        try {
            await stayService.save(stayData)
            showSuccessMsg('Stay updated successfully')
            navigate('/stay')
        } catch (err) {
            console.error('Error updating stay:', err)
            showErrorMsg('Cannot update stay')
        }
    };

    if (loading) return <div>Loading...</div>
    if (error) return <div>{error}</div>

    return (
        <div className="edit-stay">
            {step === 1 && <StayDetails stayData={stayData} onChange={handleChange} />}
            {step === 2 && <LocationDetails stayData={stayData} onChange={handleChange} />}
            {/* {step === 3 && <PricingDetails stayData={stayData} onChange={handleChange} />} */}
            {step === 4 && <Amenities stayData={stayData} onChange={handleChange} />}
            {step === 5 && <HostDetails stayData={stayData} onChange={handleChange} />}
            {step === 6 && <ReviewStep stayData={stayData} onSubmit={handleSubmit} />}

            <div className="navigation">
                {step > 1 && <button onClick={handlePreviousStep}>Back</button>}
                {step < 6 ? (
                    <button onClick={handleNextStep}>Next</button>
                ) : (
                    <button onClick={handleSubmit}>Save Changes</button>
                )}
            </div>
        </div>
    )
}

export default EditStay;