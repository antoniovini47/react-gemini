import axios from 'axios';

const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

const geminiprov1 = `/v1/models/gemini-pro:generateContent`;

const version = geminiprov1; //Select Version Here
const url = `https://generativelanguage.googleapis.com${version}`;

const GeminiService = {
    getImageResponse: async (prompt, imageUri) => {



        try {
            const response = await axios.post(url, 
            {
                "contents":[
                    {
                        "role": "user",
                        "parts":[
                            {
                                fileData: {
                                    mimeType: "image/jpeg",
                                    content: image,
                                }
                            }, 
                            {
                                "text": prompt
                            },
                        ]
                    }
                ]
            }, 
            {
                headers: {
                  'Content-Type': 'application/json',
                  'x-goog-api-key': `${GEMINI_API_KEY}`
                },
              })
            console.log('Response:', response);
            return response;
        } catch (error) {
            console.error('Error fetching data from Gemini API:', error);
            console.error('Error:', error.response.data.error.message);
            throw error;
        }
    },

    getChatResponse: async (prompt) => {
        try {
            console.log('Prompt:', prompt);
            const response = await axios.post(url, 
            {
                "contents":[
                    {
                        "role": "user",
                        "parts":[
                            {
                                "text": prompt
                            }
                        ]
                    }
                ]
            }, 
            {
                headers: {
                  'Content-Type': 'application/json',
                  'x-goog-api-key': `${GEMINI_API_KEY}`
                },
              })
            console.log('Response:', response);
            return response;
            
        } catch (error) {
            console.error('Error fetching data from Gemini API:', error);
            throw error;
        }
    }
};

export default GeminiService;