export function checkEnvVariables() {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY
    
    if (!apiKey) {
        console.error('Missing OPENAI_API_KEY in environment variables')
        return false
    }
    
    // Check if the API key starts with 'sk-'
    if (!apiKey.startsWith('sk-')) {
        console.error('Invalid API key format. OpenAI API keys should start with "sk-"')
        return false
    }
    
    return true
}

// import axios from 'axios';

// api
// // Check if the API key is missing
// if (!API_KEY) {
//     console.warn('Hugging Face API key is missing! Please add it to your .env file as VITE_HUGGINGFACE_API_KEY.');
// }

// export const chatbotService = {
//     async getChatResponse(message) {
//         try {
//             const response = await axios({
//                 method: 'POST',
//                 url: API_URL,
//                 headers: {
//                     'Authorization': `Bearer ${API_KEY}`,
//                     'Content-Type': 'application/json'
//                 },
//                 data: {
//                     inputs: {
//                         text: message
//                     },
//                     parameters: {
//                         max_length: 100,
//                         temperature: 0.7,
//                         return_full_text: false
//                     }
//                 }
//             })

//             return response.data[0].generated_text

//         } catch (error) {
//             console.error('Hugging Face API Error:', error.response?.data || error)

//             if (error.response?.data?.error) {
//                 if (error.response.data.error.includes('model')) {
//                     // Try with a different model
//                     return this.getFallbackResponse(message)
//                 }
//             }

//             return "I'm having trouble connecting right now. Please try again later."
//         }
//     },

//     // Fallback to a simpler model if the first one fails
//     async getFallbackResponse(message) {
//         try {
//             const fallbackUrl = 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-small'

//             const response = await axios({
//                 method: 'POST',
//                 url: fallbackUrl,
//                 headers: {
//                     'Authorization': `Bearer ${API_KEY}`,
//                     'Content-Type': 'application/json'
//                 },
//                 data: {
//                     inputs: message
//                 }
//             })

//             return response.data[0].generated_text

//         } catch (error) {
//             console.error('Fallback API Error:', error)
//             return "I'm having trouble connecting right now. Please try again later."
//         }
//     }
// }


// import axios from 'axios'

// export const chatbotService = {
//     async getChatResponse(userMessage) {
//         try {
//             const userQuestion = userMessage.toLowerCase()

//             // Booking & Pricing
//             if (userQuestion.includes('price') || userQuestion.includes('cost') || userQuestion.includes('expensive')) {
//                 return "The total price includes all fees and taxes. You can see the detailed breakdown in the price details section, including nightly rate, cleaning fee, and service charges."
//             }
//             if (userQuestion.includes('book') || userQuestion.includes('reserve')) {
//                 return "To book this place, simply select your dates, number of guests, and click 'Reserve'. You'll receive instant confirmation after payment."
//             }
//             if (userQuestion.includes('payment') || userQuestion.includes('pay')) {
//                 return "We accept all major credit cards, PayPal, and bank transfers. Payment is secure and encrypted."
//             }
//             if (userQuestion.includes('deposit') || userQuestion.includes('security')) {
//                 return "A security deposit may be required and will be fully refunded within 7 days after checkout if no damages are reported."
//             }

//             // Cancellation & Changes
//             if (userQuestion.includes('cancel')) {
//                 return "You can cancel for free up to 48 hours before check-in. After that, the first night is non-refundable. Check the cancellation policy section for full details."
//             }
//             if (userQuestion.includes('change') || userQuestion.includes('modify')) {
//                 return "You can modify your booking dates up to 72 hours before check-in, subject to availability. Use the 'Modify Booking' option in your trips."
//             }
//             if (userQuestion.includes('refund')) {
//                 return "Refunds are processed within 5-7 business days. The timing might vary depending on your payment method and bank."
//             }

//             // Check-in/out & Access
//             if (userQuestion.includes('check')) {
//                 return "Check-in is from 3 PM to 8 PM, and check-out is by 11 AM. Early check-in or late check-out might be available upon request."
//             }
//             if (userQuestion.includes('key') || userQuestion.includes('access')) {
//                 return "You'll receive detailed check-in instructions and access codes 24 hours before your arrival via email and the app."
//             }
//             if (userQuestion.includes('late') || userQuestion.includes('early')) {
//                 return "Early check-in or late check-out may be available for an additional fee, subject to availability. Please contact us to arrange this."
//             }

//             // Location & Transportation
//             if (userQuestion.includes('location') || userQuestion.includes('where')) {
//                 return "The exact location and address will be provided after booking confirmation. You can view the general area and nearby attractions on the map above."
//             }
//             if (userQuestion.includes('direction') || userQuestion.includes('get there')) {
//                 return "Detailed directions and transportation options will be provided in your booking confirmation. The property is easily accessible by car and public transport."
//             }
//             if (userQuestion.includes('airport') || userQuestion.includes('transfer')) {
//                 return "Airport transfers can be arranged for an additional fee. Public transportation and taxi services are also readily available."
//             }

//             // Amenities & Features
//             if (userQuestion.includes('wifi') || userQuestion.includes('internet')) {
//                 return "High-speed WiFi (100+ Mbps) is included with your stay. The network details will be provided upon check-in."
//             }
//             if (userQuestion.includes('park')) {
//                 return "Free private parking is available on the premises. No reservation needed."
//             }
//             if (userQuestion.includes('pet') || userQuestion.includes('dog') || userQuestion.includes('cat')) {
//                 return "Please check the house rules section for pet policies. Additional pet fees may apply."
//             }
//             if (userQuestion.includes('clean') || userQuestion.includes('housekeeping')) {
//                 return "Professional cleaning is done before each stay. Additional housekeeping during your stay can be arranged for an extra fee."
//             }
//             if (userQuestion.includes('kitchen') || userQuestion.includes('cook')) {
//                 return "The fully equipped kitchen includes a stove, oven, microwave, refrigerator, dishwasher, and essential cookware."
//             }
//             if (userQuestion.includes('air') || userQuestion.includes('ac') || userQuestion.includes('heat')) {
//                 return "The property has central air conditioning and heating that you can control."
//             }

//             // Capacity & Rules
//             if (userQuestion.includes('guest') || userQuestion.includes('people')) {
//                 return "The maximum number of guests is listed in the property details. Additional guests beyond the booking are not permitted."
//             }
//             if (userQuestion.includes('child') || userQuestion.includes('baby') || userQuestion.includes('kid')) {
//                 return "The property is family-friendly. We can provide a crib and high chair upon request."
//             }
//             if (userQuestion.includes('smoke') || userQuestion.includes('smoking')) {
//                 return "This is a non-smoking property. Smoking is only permitted in designated outdoor areas."
//             }
//             if (userQuestion.includes('party') || userQuestion.includes('event')) {
//                 return "Parties and events are not permitted without prior approval. Please contact us for special arrangements."
//             }

//             // Support & Services
//             if (userQuestion.includes('help') || userQuestion.includes('support')) {
//                 return "24/7 support is available through the app or by calling our emergency contact number provided in your booking confirmation."
//             }
//             if (userQuestion.includes('contact') || userQuestion.includes('phone')) {
//                 return "You'll receive the host's contact details 24 hours before check-in. Our support team is also available 24/7."
//             }
//             if (userQuestion.includes('emergency')) {
//                 return "Emergency contact numbers and local emergency services information will be provided in your booking confirmation and are also available in the property guide."
//             }

//             // Facilities & Area
//             if (userQuestion.includes('pool') || userQuestion.includes('swim')) {
//                 return "Pool availability and hours are listed in the amenities section. Please check seasonal opening times."
//             }
//             if (userQuestion.includes('gym') || userQuestion.includes('fitness')) {
//                 return "If available, fitness facility access and hours are listed in the amenities section."
//             }
//             if (userQuestion.includes('restaurant') || userQuestion.includes('food')) {
//                 return "You'll find our dining recommendations guide in the property, listing nearby restaurants and delivery options."
//             }
//             if (userQuestion.includes('beach') || userQuestion.includes('sea')) {
//                 return "Distance to the beach and beach amenities are listed in the location section of the property details."
//             }

//             // ... previous responses ...

//             // Security & Safety
//             if (userQuestion.includes('security') || userQuestion.includes('safe')) {
//                 return "The property is equipped with 24/7 security cameras in common areas, secure entry system, and a safe in your unit for valuables."
//             }
//             if (userQuestion.includes('camera')) {
//                 return "Security cameras are only present in outdoor common areas. Your privacy inside the unit is completely protected."
//             }
//             if (userQuestion.includes('medical') || userQuestion.includes('doctor')) {
//                 return "The nearest medical facility is within 10 minutes. Emergency numbers are listed in the property guide."
//             }

//             // Accessibility
//             if (userQuestion.includes('wheelchair') || userQuestion.includes('accessible')) {
//                 return "Accessibility features are listed in the property details. Please contact us for specific accessibility requirements."
//             }
//             if (userQuestion.includes('elevator') || userQuestion.includes('lift')) {
//                 return "Information about elevator access is listed in the building features section."
//             }
//             if (userQuestion.includes('stairs') || userQuestion.includes('steps')) {
//                 return "Details about stairs and property levels are provided in the accessibility section of the listing."
//             }

//             // Technology & Entertainment
//             if (userQuestion.includes('tv') || userQuestion.includes('television')) {
//                 return "Smart TV with Netflix, cable, and streaming services is provided. Login instructions are in the welcome guide."
//             }
//             if (userQuestion.includes('stream') || userQuestion.includes('netflix')) {
//                 return "All streaming services are set up and ready to use with our guest account."
//             }
//             if (userQuestion.includes('game') || userQuestion.includes('console')) {
//                 return "Gaming consoles and board games are available in the entertainment center."
//             }

//             // Kitchen & Dining
//             if (userQuestion.includes('breakfast') || userQuestion.includes('food')) {
//                 return "While breakfast isn't provided, the kitchen is fully stocked with coffee, tea, and cooking essentials."
//             }
//             if (userQuestion.includes('restaurant') || userQuestion.includes('eat')) {
//                 return "Our digital guidebook includes local restaurant recommendations, delivery options, and exclusive dining discounts."
//             }
//             if (userQuestion.includes('grocery') || userQuestion.includes('supermarket')) {
//                 return "The nearest supermarket is 5 minutes away. We provide a list of local grocery stores in our welcome guide."
//             }

//             // Laundry & Cleaning
//             if (userQuestion.includes('laundry') || userQuestion.includes('wash')) {
//                 return "Washer and dryer are available in the unit, with complimentary detergent provided."
//             }
//             if (userQuestion.includes('towel') || userQuestion.includes('linen')) {
//                 return "Fresh towels and linens are provided for your stay. Extra sets are available in the closet."
//             }
//             if (userQuestion.includes('iron')) {
//                 return "An iron and ironing board are provided in the laundry area."
//             }

//             // Outdoor Spaces
//             if (userQuestion.includes('balcony') || userQuestion.includes('terrace')) {
//                 return "Balcony/terrace details and furniture are listed in the outdoor spaces section."
//             }
//             if (userQuestion.includes('garden') || userQuestion.includes('yard')) {
//                 return "Garden access and features are detailed in the outdoor amenities section."
//             }
//             if (userQuestion.includes('bbq') || userQuestion.includes('grill')) {
//                 return "BBQ facilities are available in the designated outdoor area. Please check usage guidelines."
//             }

//             // Work & Business
//             if (userQuestion.includes('work') || userQuestion.includes('desk')) {
//                 return "A dedicated workspace with high-speed internet is available for business needs."
//             }
//             if (userQuestion.includes('print') || userQuestion.includes('printer')) {
//                 return "Printing services are available at the nearby business center or local print shop."
//             }
//             if (userQuestion.includes('meeting') || userQuestion.includes('conference')) {
//                 return "Information about meeting spaces and business facilities can be found in our services section."
//             }

//             // Local Transportation
//             if (userQuestion.includes('bus') || userQuestion.includes('train')) {
//                 return "Public transportation details and schedules are provided in our local guide."
//             }
//             if (userQuestion.includes('taxi') || userQuestion.includes('uber')) {
//                 return "Ride-sharing services and local taxi numbers are available in our transportation guide."
//             }
//             if (userQuestion.includes('bike') || userQuestion.includes('bicycle')) {
//                 return "Bike rental information and cycling routes are available in our activities guide."
//             }

//             // Shopping & Services
//             if (userQuestion.includes('shop') || userQuestion.includes('mall')) {
//                 return "A list of nearby shopping centers and boutiques is provided in our local guide."
//             }
//             if (userQuestion.includes('souvenir') || userQuestion.includes('gift')) {
//                 return "We recommend several local shops for authentic souvenirs and gifts."
//             }
//             if (userQuestion.includes('pharmacy') || userQuestion.includes('drugstore')) {
//                 return "The nearest pharmacy is located within walking distance. Details are in our local services guide."
//             }

//             // Entertainment & Activities
//             if (userQuestion.includes('tour') || userQuestion.includes('guide')) {
//                 return "We can recommend local tours and guides. Check our activities section for details."
//             }
//             if (userQuestion.includes('museum') || userQuestion.includes('gallery')) {
//                 return "Information about cultural attractions and current exhibitions is available in our city guide."
//             }
//             if (userQuestion.includes('night') || userQuestion.includes('club')) {
//                 return "Nightlife recommendations and entertainment venues are listed in our local guide."
//             }

//             // Weather & Seasonal
//             if (userQuestion.includes('weather') || userQuestion.includes('forecast')) {
//                 return "Local weather information and seasonal recommendations are provided in our welcome guide."
//             }
//             if (userQuestion.includes('beach') || userQuestion.includes('pool')) {
//                 return "Beach/pool accessibility and seasonal opening times are listed in our amenities section."
//             }
//             if (userQuestion.includes('ski') || userQuestion.includes('snow')) {
//                 return "Winter sports information and equipment rental details are available in our seasonal guide."
//             }

//             if (userQuestion.includes('birthday') || userQuestion.includes('celebration')) {
//                 return "We can help arrange special decorations or celebrations. Contact us for package options."
//             }
//             if (userQuestion.includes('wedding') || userQuestion.includes('honeymoon')) {
//                 return "We offer special romantic packages and can assist with wedding accommodation arrangements."
//             }
//             if (userQuestion.includes('anniversary')) {
//                 return "Let us help make your anniversary special with our romantic add-on packages."
//             }

//             // Extended Stays
//             if (userQuestion.includes('monthly') || userQuestion.includes('long term')) {
//                 return "We offer special rates for stays longer than 28 days. Contact us for long-term stay pricing."
//             }
//             if (userQuestion.includes('discount') || userQuestion.includes('offer')) {
//                 return "Check our special offers section for current discounts and seasonal promotions."
//             }
//             if (userQuestion.includes('weekly rate')) {
//                 return "Weekly rates are available with a minimum 7-night stay. See pricing details for more information."
//             }

//             // Business Travel
//             if (userQuestion.includes('business center') || userQuestion.includes('office')) {
//                 return "Our business center includes printing, scanning, and conference call facilities."
//             }
//             if (userQuestion.includes('invoice') || userQuestion.includes('receipt')) {
//                 return "Business invoices can be provided upon request. Please specify any special billing requirements."
//             }
//             if (userQuestion.includes('corporate') || userQuestion.includes('business rate')) {
//                 return "Corporate rates are available for registered businesses. Contact our business team for details."
//             }

//             // Wellness & Spa
//             if (userQuestion.includes('spa') || userQuestion.includes('massage')) {
//                 return "Spa services can be arranged in-room or at nearby partner facilities."
//             }
//             if (userQuestion.includes('yoga') || userQuestion.includes('meditation')) {
//                 return "Yoga mats are provided, and we can recommend local yoga classes and wellness centers."
//             }
//             if (userQuestion.includes('gym schedule') || userQuestion.includes('fitness center')) {
//                 return "The fitness center is open 24/7 with key card access. Personal training available upon request."
//             }

//             // Family Services
//             if (userQuestion.includes('babysit') || userQuestion.includes('childcare')) {
//                 return "Reliable babysitting services can be arranged through our trusted partners."
//             }
//             if (userQuestion.includes('playground') || userQuestion.includes('kids area')) {
//                 return "Children's play areas and family-friendly facilities are marked on our property map."
//             }
//             if (userQuestion.includes('baby equipment') || userQuestion.includes('stroller')) {
//                 return "We provide cribs, high chairs, and can arrange rental of additional baby equipment."
//             }

//             // Local Experiences
//             if (userQuestion.includes('local guide') || userQuestion.includes('tour guide')) {
//                 return "We partner with local guides for authentic experiences and tours."
//             }
//             if (userQuestion.includes('cooking class') || userQuestion.includes('workshop')) {
//                 return "Local cooking classes and cultural workshops can be arranged through our concierge."
//             }
//             if (userQuestion.includes('wine tasting') || userQuestion.includes('vineyard')) {
//                 return "Wine tasting tours and local vineyard visits can be arranged upon request."
//             }

//             // Transportation Services
//             if (userQuestion.includes('car rental') || userQuestion.includes('hire car')) {
//                 return "Car rental services can be arranged with our partner agencies at preferential rates."
//             }
//             if (userQuestion.includes('shuttle') || userQuestion.includes('transfer service')) {
//                 return "Airport shuttle service is available for an additional fee. Please book 24 hours in advance."
//             }
//             if (userQuestion.includes('parking permit') || userQuestion.includes('garage')) {
//                 return "Parking permits and garage access cards are provided at check-in."
//             }

//             // Property Features
//             if (userQuestion.includes('view') || userQuestion.includes('scenery')) {
//                 return "Property views and room orientations are detailed in each unit description."
//             }
//             if (userQuestion.includes('noise') || userQuestion.includes('quiet')) {
//                 return "Quiet hours are from 10 PM to 8 AM. All units feature sound-reducing windows."
//             }
//             if (userQuestion.includes('storage') || userQuestion.includes('luggage')) {
//                 return "Complimentary luggage storage is available before check-in and after check-out."
//             }

//             // Digital Services
//             if (userQuestion.includes('smart home') || userQuestion.includes('automation')) {
//                 return "Units feature smart home controls for lighting, temperature, and entertainment systems."
//             }
//             if (userQuestion.includes('charging') || userQuestion.includes('usb')) {
//                 return "USB charging ports and international power adapters are provided in all units."
//             }
//             if (userQuestion.includes('streaming') || userQuestion.includes('chromecast')) {
//                 return "Smart TVs are equipped with Chromecast and various streaming apps."
//             }

//             if (userQuestion.includes('seasonal') || userQuestion.includes('activities')) {
//                 return "Our seasonal activities calendar is updated monthly with local events and recommendations."
//             }
//             if (userQuestion.includes('summer') || userQuestion.includes('beach access')) {
//                 return "Summer amenities include beach equipment, coolers, and outdoor games."
//             }
//             if (userQuestion.includes('winter') || userQuestion.includes('ski storage')) {
//                 return "Winter amenities include ski storage, boot warmers, and shuttle service to ski resorts."
//             }

//             // Dining & Culinary
//             if (userQuestion.includes('private chef') || userQuestion.includes('catering')) {
//                 return "Private chef services and catering can be arranged with advance notice."
//             }
//             if (userQuestion.includes('dietary') || userQuestion.includes('allergies')) {
//                 return "We can recommend restaurants that accommodate specific dietary requirements."
//             }
//             if (userQuestion.includes('welcome basket') || userQuestion.includes('groceries')) {
//                 return "Pre-arrival grocery shopping and welcome baskets are available upon request."
//             }

//             // Health & Safety
//             if (userQuestion.includes('covid') || userQuestion.includes('sanitization')) {
//                 return "We follow enhanced cleaning protocols and provide sanitization stations throughout the property."
//             }
//             if (userQuestion.includes('first aid') || userQuestion.includes('emergency kit')) {
//                 return "First aid kits are located in each unit, and emergency contacts are listed in the welcome guide."
//             }
//             if (userQuestion.includes('hospital') || userQuestion.includes('clinic')) {
//                 return "The nearest medical facilities are marked on our local area map with contact information."
//             }

//             // Pet Services
//             if (userQuestion.includes('pet supplies') || userQuestion.includes('dog bed')) {
//                 return "Pet amenities include beds, bowls, and treats. Local pet services are listed in our guide."
//             }
//             if (userQuestion.includes('dog walk') || userQuestion.includes('pet sitter')) {
//                 return "Pet sitting and dog walking services can be arranged through our concierge."
//             }
//             if (userQuestion.includes('vet') || userQuestion.includes('pet emergency')) {
//                 return "Emergency veterinary services and pet supply stores are listed in our pet guide."
//             }

//             // Special Requests
//             if (userQuestion.includes('birthday cake') || userQuestion.includes('surprise')) {
//                 return "We can arrange special surprises, decorations, or celebration packages."
//             }
//             if (userQuestion.includes('proposal') || userQuestion.includes('romantic')) {
//                 return "Our romance package includes rose petals, champagne, and special arrangements."
//             }
//             if (userQuestion.includes('anniversary package') || userQuestion.includes('celebration')) {
//                 return "Special occasion packages can be customized to your preferences."
//             }

//             // Local Culture & Events
//             if (userQuestion.includes('festival') || userQuestion.includes('event calendar')) {
//                 return "Check our local events calendar for festivals, markets, and cultural activities."
//             }
//             if (userQuestion.includes('local market') || userQuestion.includes('farmers market')) {
//                 return "Weekly markets and local artisan fairs are listed in our activities guide."
//             }
//             if (userQuestion.includes('cultural') || userQuestion.includes('traditional')) {
//                 return "We can recommend authentic local experiences and cultural activities."
//             }

//             // Sports & Recreation
//             if (userQuestion.includes('tennis') || userQuestion.includes('court')) {
//                 return "Tennis court bookings and equipment rental are available through the front desk."
//             }
//             if (userQuestion.includes('golf') || userQuestion.includes('course')) {
//                 return "We partner with local golf courses and can arrange tee times and equipment rental."
//             }
//             if (userQuestion.includes('water sports') || userQuestion.includes('kayak')) {
//                 return "Water sports equipment rental and activities can be arranged through our activities desk."
//             }

//             // Business Services
//             if (userQuestion.includes('conference') || userQuestion.includes('meeting room')) {
//                 return "Conference facilities include AV equipment, catering options, and business services."
//             }
//             if (userQuestion.includes('fax') || userQuestion.includes('scan')) {
//                 return "Business center services include printing, scanning, and fax services."
//             }
//             if (userQuestion.includes('workspace') || userQuestion.includes('remote work')) {
//                 return "Dedicated workspaces with high-speed internet are available in each unit."
//             }

//             // Photography & Media
//             if (userQuestion.includes('photo') || userQuestion.includes('photography')) {
//                 return "Professional photography services can be arranged for special occasions."
//             }
//             if (userQuestion.includes('drone') || userQuestion.includes('aerial')) {
//                 return "Drone photography requires prior approval and proper permits."
//             }
//             if (userQuestion.includes('social media') || userQuestion.includes('instagram')) {
//                 return "Share your stay with #OurPropertyTag - best photos featured on our social media."
//             }

//             // Sustainability
//             if (userQuestion.includes('eco') || userQuestion.includes('sustainable')) {
//                 return "Our eco-friendly initiatives include solar power, recycling, and water conservation."
//             }
//             if (userQuestion.includes('recycling') || userQuestion.includes('waste')) {
//                 return "Recycling bins are provided with guidelines for proper waste separation."
//             }
//             if (userQuestion.includes('green') || userQuestion.includes('environmental')) {
//                 return "We're committed to environmental sustainability with various green initiatives."
//             }

//             // VIP Services
//             if (userQuestion.includes('vip') || userQuestion.includes('luxury')) {
//                 return "VIP services include private check-in, concierge, and exclusive amenities."
//             }
//             if (userQuestion.includes('helicopter') || userQuestion.includes('private transfer')) {
//                 return "Luxury transfer services including helicopter can be arranged upon request."
//             }
//             if (userQuestion.includes('butler') || userQuestion.includes('personal assistant')) {
//                 return "Personal butler and assistant services are available for premium bookings."
//             }

//             // Room Specifics
//             if (userQuestion.includes('room size') || userQuestion.includes('square')) {
//                 return "Room dimensions and floor plans are available in the detailed property description."
//             }
//             if (userQuestion.includes('bed size') || userQuestion.includes('mattress')) {
//                 return "All beds feature luxury mattresses. King beds in master bedrooms, queens in secondary rooms."
//             }
//             if (userQuestion.includes('pillow') || userQuestion.includes('bedding')) {
//                 return "Hypoallergenic pillows and premium bedding are provided. Additional pillows available on request."
//             }

//             // Bathroom Amenities
//             if (userQuestion.includes('bathroom') || userQuestion.includes('shower')) {
//                 return "Bathrooms feature rainfall showers, luxury toiletries, and heated towel racks."
//             }
//             if (userQuestion.includes('toiletries') || userQuestion.includes('amenities')) {
//                 return "Premium organic toiletries are provided and replenished daily upon request."
//             }
//             if (userQuestion.includes('hair dryer') || userQuestion.includes('beauty')) {
//                 return "Professional hair dryers and beauty mirrors are provided in each bathroom."
//             }

//             // Kitchen Equipment
//             if (userQuestion.includes('coffee') || userQuestion.includes('tea')) {
//                 return "Nespresso machine and electric kettle provided with complimentary coffee/tea selection."
//             }
//             if (userQuestion.includes('cookware') || userQuestion.includes('utensils')) {
//                 return "Full set of premium cookware, utensils, and dining ware for 8 people provided."
//             }
//             if (userQuestion.includes('appliance') || userQuestion.includes('microwave')) {
//                 return "Modern appliances include refrigerator, dishwasher, microwave, and wine cooler."
//             }

//             // Entertainment Systems
//             if (userQuestion.includes('sound system') || userQuestion.includes('speaker')) {
//                 return "Bluetooth speakers and smart home audio system available in main living areas."
//             }
//             if (userQuestion.includes('movie') || userQuestion.includes('dvd')) {
//                 return "Smart TV includes access to Netflix, Amazon Prime, and other streaming services."
//             }
//             if (userQuestion.includes('gaming') || userQuestion.includes('playstation')) {
//                 return "Gaming consoles available upon request with a selection of family-friendly games."
//             }

//             // Work Amenities
//             if (userQuestion.includes('desk') || userQuestion.includes('workspace')) {
//                 return "Ergonomic workspace with high-speed internet and office supplies provided."
//             }
//             if (userQuestion.includes('monitor') || userQuestion.includes('computer')) {
//                 return "External monitors and computer accessories available upon request."
//             }
//             if (userQuestion.includes('internet speed') || userQuestion.includes('bandwidth')) {
//                 return "High-speed fiber internet with minimum 300Mbps for seamless video conferencing."
//             }

//             // Outdoor Features
//             if (userQuestion.includes('patio') || userQuestion.includes('outdoor seating')) {
//                 return "Private patio with comfortable seating and outdoor dining furniture."
//             }
//             if (userQuestion.includes('garden') || userQuestion.includes('landscape')) {
//                 return "Professionally maintained gardens with native plants and seasonal flowers."
//             }
//             if (userQuestion.includes('outdoor kitchen') || userQuestion.includes('bbq area')) {
//                 return "Outdoor kitchen features premium gas grill, prep area, and dining space."
//             }

//             // Security Features
//             if (userQuestion.includes('safe') || userQuestion.includes('vault')) {
//                 return "In-room digital safe large enough for laptops and valuables provided."
//             }
//             if (userQuestion.includes('security camera') || userQuestion.includes('surveillance')) {
//                 return "24/7 security monitoring in common areas with secure key card access."
//             }
//             if (userQuestion.includes('door lock') || userQuestion.includes('key card')) {
//                 return "Smart locks with unique codes for each guest and 24/7 security monitoring."
//             }

//             // Transportation Services
//             if (userQuestion.includes('airport pickup') || userQuestion.includes('transfer')) {
//                 return "Luxury airport transfers available with advance booking at preferential rates."
//             }
//             if (userQuestion.includes('car service') || userQuestion.includes('chauffeur')) {
//                 return "Private chauffeur service available for daily hire or special occasions."
//             }
//             if (userQuestion.includes('bicycle') || userQuestion.includes('bike rental')) {
//                 return "Complimentary bicycle rentals available with helmets and locks provided."
//             }

//             // Local Experiences
//             if (userQuestion.includes('local food') || userQuestion.includes('cuisine')) {
//                 return "We can arrange private cooking classes featuring local cuisine and market tours."
//             }
//             if (userQuestion.includes('art') || userQuestion.includes('gallery')) {
//                 return "Curated art tours and gallery visits can be arranged through our concierge."
//             }
//             if (userQuestion.includes('wine') || userQuestion.includes('tasting')) {
//                 return "Private wine tastings and vineyard tours available with local sommeliers."
//             }

//             // Wellness Services
//             if (userQuestion.includes('yoga') || userQuestion.includes('meditation')) {
//                 return "Private yoga and meditation sessions available in-room or garden setting."
//             }
//             if (userQuestion.includes('massage') || userQuestion.includes('spa treatment')) {
//                 return "In-room massage and spa treatments can be arranged with certified therapists."
//             }
//             if (userQuestion.includes('personal trainer') || userQuestion.includes('fitness')) {
//                 return "Personal training sessions available in our fully equipped fitness center."
//             }

//             // Special Events & Celebrations
//             if (userQuestion.includes('birthday package') || userQuestion.includes('cake')) {
//                 return "Birthday packages include cake, decorations, and optional champagne service."
//             }
//             if (userQuestion.includes('anniversary') || userQuestion.includes('romantic dinner')) {
//                 return "Anniversary packages feature private dining, rose petals, and romantic amenities."
//             }
//             if (userQuestion.includes('proposal') || userQuestion.includes('engagement')) {
//                 return "Our proposal package includes photography, champagne, and special arrangements."
//             }

//             // Family Services
//             if (userQuestion.includes('baby equipment') || userQuestion.includes('crib')) {
//                 return "Baby equipment including cribs, monitors, and sterilizers available free of charge."
//             }
//             if (userQuestion.includes('kids club') || userQuestion.includes('children activities')) {
//                 return "Kids club operates daily with supervised activities and educational programs."
//             }
//             if (userQuestion.includes('family meal') || userQuestion.includes('kids menu')) {
//                 return "Family meal packages and special kids' menus available for in-room dining."
//             }

//             // Business Services
//             if (userQuestion.includes('meeting room') || userQuestion.includes('conference')) {
//                 return "Meeting rooms equipped with AV equipment and videoconferencing facilities."
//             }
//             if (userQuestion.includes('presentation') || userQuestion.includes('projector')) {
//                 return "Presentation equipment including projectors and screens available for rent."
//             }
//             if (userQuestion.includes('business center') || userQuestion.includes('printing')) {
//                 return "24/7 business center with printing, scanning, and secretarial services."
//             }

//             // Seasonal Activities
//             if (userQuestion.includes('summer activities') || userQuestion.includes('beach')) {
//                 return "Summer activities include beach equipment, water sports, and outdoor yoga."
//             }
//             if (userQuestion.includes('winter sports') || userQuestion.includes('ski')) {
//                 return "Winter activities include ski equipment rental and shuttle to nearby slopes."
//             }
//             if (userQuestion.includes('spring') || userQuestion.includes('garden tour')) {
//                 return "Spring activities feature garden tours, flower workshops, and nature walks."
//             }

//             // Dining Experiences
//             if (userQuestion.includes('private chef') || userQuestion.includes('in-room dining')) {
//                 return "Private chef services available for intimate dining experiences in your unit."
//             }
//             if (userQuestion.includes('cooking class') || userQuestion.includes('culinary')) {
//                 return "Interactive cooking classes with local chefs can be arranged."
//             }
//             if (userQuestion.includes('wine pairing') || userQuestion.includes('sommelier')) {
//                 return "Wine pairing experiences and sommelier services available upon request."
//             }

//             // Wellness & Fitness
//             if (userQuestion.includes('gym equipment') || userQuestion.includes('weights')) {
//                 return "State-of-the-art gym equipment including free weights and cardio machines."
//             }
//             if (userQuestion.includes('spa package') || userQuestion.includes('treatment')) {
//                 return "Comprehensive spa packages including massage, facial, and body treatments."
//             }
//             if (userQuestion.includes('meditation') || userQuestion.includes('mindfulness')) {
//                 return "Guided meditation and mindfulness sessions available in our zen garden."
//             }

//             // Technology Support
//             if (userQuestion.includes('tech support') || userQuestion.includes('IT help')) {
//                 return "24/7 tech support available for all in-room entertainment and business systems."
//             }
//             if (userQuestion.includes('charging station') || userQuestion.includes('adapter')) {
//                 return "Universal charging stations and international adapters provided in all units."
//             }
//             if (userQuestion.includes('smart home') || userQuestion.includes('automation')) {
//                 return "Smart home controls for lighting, temperature, and entertainment systems."
//             }

//             // Local Transportation
//             if (userQuestion.includes('public transport') || userQuestion.includes('bus')) {
//                 return "Public transportation maps and passes available at the front desk."
//             }
//             if (userQuestion.includes('taxi service') || userQuestion.includes('cab')) {
//                 return "Reliable taxi service can be arranged 24/7 through our concierge."
//             }
//             if (userQuestion.includes('car rental') || userQuestion.includes('vehicle')) {
//                 return "Luxury car rentals available with doorstep delivery and pickup."
//             }

//             // Shopping Services
//             if (userQuestion.includes('shopping guide') || userQuestion.includes('mall')) {
//                 return "Shopping guides with exclusive discounts at local boutiques and malls."
//             }
//             if (userQuestion.includes('personal shopper') || userQuestion.includes('stylist')) {
//                 return "Personal shopping assistance and styling services available."
//             }
//             if (userQuestion.includes('souvenir') || userQuestion.includes('local products')) {
//                 return "Curated selection of local products and souvenirs available in our boutique."
//             }

//             // Photography Services
//             if (userQuestion.includes('photographer') || userQuestion.includes('photo shoot')) {
//                 return "Professional photography services available for special occasions."
//             }
//             if (userQuestion.includes('drone') || userQuestion.includes('aerial')) {
//                 return "Drone photography and videography services with proper permits."
//             }
//             if (userQuestion.includes('photo tour') || userQuestion.includes('instagram')) {
//                 return "Photo tours of Instagram-worthy locations with professional photographers."
//             }

//             // Cultural Experiences
//             if (userQuestion.includes('local culture') || userQuestion.includes('traditions')) {
//                 return "Experience local traditions through our curated cultural programs and workshops."
//             }
//             if (userQuestion.includes('language class') || userQuestion.includes('lessons')) {
//                 return "Private language lessons available with certified local instructors."
//             }
//             if (userQuestion.includes('art workshop') || userQuestion.includes('crafts')) {
//                 return "Traditional craft workshops and art classes can be arranged."
//             }

//             // Adventure Activities
//             if (userQuestion.includes('hiking') || userQuestion.includes('trail')) {
//                 return "Guided hiking tours with experienced local guides and equipment provided."
//             }
//             if (userQuestion.includes('rock climbing') || userQuestion.includes('adventure')) {
//                 return "Adventure sports including rock climbing with certified instructors."
//             }
//             if (userQuestion.includes('water sport') || userQuestion.includes('diving')) {
//                 return "Water sports activities including scuba diving, snorkeling, and surfing lessons."
//             }

//             // Pet Services
//             if (userQuestion.includes('pet menu') || userQuestion.includes('dog food')) {
//                 return "Gourmet pet menu and premium pet food available upon request."
//             }
//             if (userQuestion.includes('pet grooming') || userQuestion.includes('dog spa')) {
//                 return "Pet grooming services can be arranged with local professional groomers."
//             }
//             if (userQuestion.includes('pet daycare') || userQuestion.includes('dog walking')) {
//                 return "Pet daycare and professional dog walking services available."
//             }

//             // Health & Medical
//             if (userQuestion.includes('doctor') || userQuestion.includes('medical')) {
//                 return "24/7 access to medical professionals and house call services."
//             }
//             if (userQuestion.includes('pharmacy') || userQuestion.includes('medication')) {
//                 return "Pharmacy delivery service available for prescriptions and medical supplies."
//             }
//             if (userQuestion.includes('allergies') || userQuestion.includes('dietary')) {
//                 return "Special arrangements for guests with allergies or dietary restrictions."
//             }

//             // Entertainment Booking
//             if (userQuestion.includes('concert') || userQuestion.includes('show tickets')) {
//                 return "Priority booking for local shows, concerts, and entertainment events."
//             }
//             if (userQuestion.includes('theater') || userQuestion.includes('performance')) {
//                 return "Theater and performance tickets with preferred seating arrangements."
//             }
//             if (userQuestion.includes('sports event') || userQuestion.includes('game')) {
//                 return "Access to sports events and game tickets through our concierge."
//             }

//             // Beauty Services
//             if (userQuestion.includes('hair salon') || userQuestion.includes('stylist')) {
//                 return "In-room hair styling and salon services can be arranged."
//             }
//             if (userQuestion.includes('makeup') || userQuestion.includes('beauty')) {
//                 return "Professional makeup artists available for special occasions."
//             }
//             if (userQuestion.includes('nail') || userQuestion.includes('manicure')) {
//                 return "Nail care and spa services available in-room or at partner salons."
//             }

//             // Special Dietary Services
//             if (userQuestion.includes('vegan') || userQuestion.includes('vegetarian')) {
//                 return "Extensive vegan and vegetarian dining options available."
//             }
//             if (userQuestion.includes('gluten') || userQuestion.includes('allergy')) {
//                 return "Gluten-free and allergen-free meal options prepared in dedicated facilities."
//             }
//             if (userQuestion.includes('kosher') || userQuestion.includes('halal')) {
//                 return "Kosher and Halal meal options available with advance notice."
//             }

//             // Child Care Services
//             if (userQuestion.includes('nanny') || userQuestion.includes('babysitter')) {
//                 return "Professional childcare services with background-checked caregivers."
//             }
//             if (userQuestion.includes('kids party') || userQuestion.includes('children entertainment')) {
//                 return "Children's party planning and entertainment services available."
//             }
//             if (userQuestion.includes('baby food') || userQuestion.includes('formula')) {
//                 return "Baby food, formula, and supplies available through our concierge."
//             }

//             // Laundry & Cleaning
//             if (userQuestion.includes('dry cleaning') || userQuestion.includes('laundry service')) {
//                 return "Same-day dry cleaning and laundry services available."
//             }
//             if (userQuestion.includes('shoe shine') || userQuestion.includes('repair')) {
//                 return "Shoe shine and repair services through our housekeeping department."
//             }
//             if (userQuestion.includes('pressing') || userQuestion.includes('ironing')) {
//                 return "Express pressing and ironing services available 24/7."
//             }

//             // Technology Rentals
//             if (userQuestion.includes('laptop') || userQuestion.includes('computer rental')) {
//                 return "Latest model laptops and tablets available for rent."
//             }
//             if (userQuestion.includes('mobile phone') || userQuestion.includes('sim card')) {
//                 return "Local SIM cards and mobile phone rentals available."
//             }
//             if (userQuestion.includes('camera') || userQuestion.includes('gopro')) {
//                 return "Professional camera equipment and GoPro rentals available."
//             }

//             // Default response
//             return "I'm here to help with any questions about the property, booking process, or your stay. Feel free to ask about specific amenities, policies, or services!"
//         } catch (error) {
//             console.error('Chat error:', error)
//             return "I'm here to help! Please feel free to ask any questions about the property or booking process."
//         }
//     }
// }