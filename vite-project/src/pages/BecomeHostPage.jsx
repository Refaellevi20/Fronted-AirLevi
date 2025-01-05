import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { stayService } from '../services/stay.service'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { HostHeader } from '../cmps/become-host/HostHeader'
import { HostFooter } from '../cmps/become-host/HostFooter'
import { StayTypeStep } from '../cmps/become-host/StayTypeStep'
import { PrivacyTypeStep } from '../cmps/become-host/PrivacyTypeStep'
import { LocationStep } from '../cmps/become-host/LocationStep'
import { FloorPlanStep } from '../cmps/become-host/FloorPlanStep'
import { AmenitiesStep } from '../cmps/become-host/AmenitiesStep'
import { PhotoStep } from '../cmps/become-host/PhotosStep'
import { TitleStep } from '../cmps/become-host/TitleStep'
import { DescriptionStep } from '../cmps/become-host/DescriptionStep'
import { PriceStep } from '../cmps/become-host/PriceStep'
import { ReviewStep } from '../cmps/become-host/ReviewStep'
import { BathroomStep } from '../cmps/become-host/BathroomStep'
import { BedroomStep } from '../cmps/become-host/BedroomStep'
import { GuestStep } from '../cmps/become-host/GuestStep'


export function BecomeHostPage() {
    const navigate = useNavigate()
    const loggedInUser = useSelector((storeState) => storeState.userModule.user)
    const [currentStep, setCurrentStep] = useState(1)
    const [stayData, setStayData] = useState({
        name: '',
        type: '',
        imgUrls: [],
        price: '',
        summary: '',
        capacity: {
            guests: 2,
            bedrooms: 1,
            beds: 1,
            bathrooms: 1
        },
        amenities: [],
        labels: [],
        host: loggedInUser,
        loc: {
            country: '',
            countryCode: '',
            city: '',
            address: '',
            lat: 0,
            lng: 0
        },
        reviews: [],
        likedByUsers: [],
        status: 'pending'
    })

    const steps = [
        {
            title: "What type of place will guests have?",
            component: <StayTypeStep stayData={stayData} setStayData={setStayData} />
        },
        {
            title: "What kind of bathroom have?",
            component: <BathroomStep stayData={stayData} setStayData={setStayData} />
        },
        {
            title: "What kind of bedroom have?",
            component: <BedroomStep stayData={stayData} setStayData={setStayData} />
        },
        {
            title: "What type of place will guests have?",
            component: <GuestStep stayData={stayData} setStayData={setStayData} />
        },
        {
            title: "What type of space will guests have?",
            component: <PrivacyTypeStep stayData={stayData} setStayData={setStayData} />
        },
        {
            title: "Where's your place located?",
            component: <LocationStep stayData={stayData} setStayData={setStayData} />
        },
        // {
        //     title: "Share some basics about your place",
        //     component: <FloorPlanStep stayData={stayData} setStayData={setStayData} />
        // },
        {
            title: "What amenities do you offer?",
            component: <AmenitiesStep stayData={stayData} setStayData={setStayData} />
        },
        {
            title: "Add some photos of your place",
            component: <PhotoStep stayData={stayData} setStayData={setStayData} />
        },
        {
            title: "Give your place a title",
            component: <TitleStep stayData={stayData} setStayData={setStayData} />
        },
        {
            title: "Create your description",
            component: <DescriptionStep stayData={stayData} setStayData={setStayData} />
        },
        {
            title: "Now, set your price",
            component: <PriceStep stayData={stayData} setStayData={setStayData} />
        },
        {
            title: "Review your listing",
            component: <ReviewStep stayData={stayData} />
        }
    ]

    useEffect(() => {
        if (!loggedInUser) {
            navigate('/login?redirect=/become-a-host')
            return
        }
    }, [loggedInUser, navigate])

    async function handleSubmit() {
        try {
            const savedStay = await stayService.save(stayData)
            // console.log('Saved stay:', savedStay) //^ debug
            showSuccessMsg('Your place was listed successfully!')
            navigate('/stay')
        } catch (err) {
            console.error('Failed to save stay:', err)
            showErrorMsg('Failed to list your place. Please try again.')
        }
    }

    function handleNext() {
        if (currentStep === steps.length) {
            handleSubmit()
        } else {
            setCurrentStep(prev => prev + 1)
        }
    }

    function handleBack() {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1)
        }
    }

    function canProceed() {
        switch (currentStep) {
            case 1: return !!stayData.type
            case 2: return !!stayData.privacyType
            case 3: return !!stayData.loc.address
            case 4: return true
            case 5: return stayData.amenities.length > 0
            case 6: return stayData.imgUrls.length >= 5
            case 7: return !!stayData.name
            case 8: return !!stayData.summary
            case 9: return !!stayData.price
            case 10: return true 
            default: return false
        }
    }

    return (
        <div className="become-host-page">
            <HostHeader
                currentStep={currentStep}
                totalSteps={steps.length}
            />
            <main className="host-content">
                <h1>{steps[currentStep - 1].title}</h1>
                <div className="step-container">
                    {steps[currentStep - 1].component}
                </div>
            </main>
            <HostFooter
                currentStep={currentStep}
                totalSteps={steps.length}
                onBack={handleBack}
                onNext={handleNext}
                canProceed={canProceed()}
            />
        </div>
    )
}