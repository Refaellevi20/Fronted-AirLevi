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