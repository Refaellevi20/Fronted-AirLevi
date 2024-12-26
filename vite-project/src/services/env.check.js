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

//TODO index header refresh header need to be fix 
//~ message border of the color of the status (maybe)
//TODO heart on the details
//! the chatbot is on perpers not outclick 
//TODO add to the database count 
//TODO database maybe wishlist