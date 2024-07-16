// src/pages/Homepage.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import Card from '../components/Card';
import Client from 'fhirclient/lib/Client';

const Homepage: React.FC<{ client: Client | null }> = ({ client }) => {
    const [selectedQuestionnaire, setSelectedQuestionnaire] = useState<string | null>(null);
    const [selectedResponse, setSelectedResponse] = useState<string | null>(null);
    const [questionnaires, setQuestionnaires] = useState<any[]>([]);
    const [responses, setResponses] = useState<any[]>([]);
    const [loadingQuestionnaires, setLoadingQuestionnaires] = useState(true);
    const [loadingResponses, setLoadingResponses] = useState(true);

    useEffect(() => {
        if (client) {
            const fetchQuestionnaires = async () => {
                try {
                    const response = await client.request('Questionnaire');
                    setQuestionnaires(response.entry || []);
                } catch (error) {
                    console.error('Error fetching questionnaires:', error);
                } finally {
                    setLoadingQuestionnaires(false);
                }
            };

            const fetchResponses = async () => {
                try {
                    const response = await client.request('QuestionnaireResponse');
                    setResponses(response.entry || []);
                } catch (error) {
                    console.error('Error fetching responses:', error);
                } finally {
                    setLoadingResponses(false);
                }
            };

            fetchQuestionnaires();
            fetchResponses();
        } else {
            console.log('Client is not initialized');
        }
    }, [client]);

    const handleQuestionnaireClick = (title: string) => {
        setSelectedQuestionnaire(title);
        setSelectedResponse(null);
    };

    const handleResponseClick = (title: string) => {
        setSelectedResponse(title);
        setSelectedQuestionnaire(null);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-1 space-y-6"
            >
                <Card title="Questionnaires">
                    {loadingQuestionnaires ? (
                        <p>Loading...</p>
                    ) : (
                        <ul className="list-none space-y-3 max-h-32 overflow-y-auto">
                            {questionnaires.map((item: any, index: number) => (
                                <li
                                    key={index}
                                    className="flex items-center cursor-pointer hover:text-blue-600"
                                    onClick={() => handleQuestionnaireClick(item.resource.title)}
                                >
                                    <FaArrowRight className="mr-2" /> {item.resource.title}
                                </li>
                            ))}
                        </ul>
                    )}
                </Card>
                <Card title="Questionnaire Responses">
                    {loadingResponses ? (
                        <p>Loading...</p>
                    ) : (
                        <ul className="list-none space-y-3 max-h-32 overflow-y-auto">
                            {responses.map((item: any, index: number) => (
                                <li
                                    key={index}
                                    className="flex items-center cursor-pointer hover:text-blue-600"
                                    onClick={() => handleResponseClick(item.resource.id)}
                                >
                                    <FaArrowRight className="mr-2" /> {item.resource.id}
                                </li>
                            ))}
                        </ul>
                    )}
                </Card>
            </motion.div>
            <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-3"
            >
                {selectedQuestionnaire && (
                    <Card title={selectedQuestionnaire}>
                        <div className="max-h-96 overflow-y-auto">
                            <p>Questionnaire content for {selectedQuestionnaire}</p>
                            <button className="bg-blue-500 text-white py-2 px-4 mt-4 rounded hover:bg-blue-700">
                                Preview Responses
                            </button>
                        </div>
                    </Card>
                )}
                {selectedResponse && (
                    <Card title={selectedResponse}>
                        <div className="max-h-96 overflow-y-auto">
                            <p>Questionnaire response for {selectedResponse}</p>
                            <button className="bg-green-500 text-white py-2 px-4 mt-4 rounded hover:bg-green-700">
                                Edit Response
                            </button>
                            <FaCheckCircle className="text-green-500 mt-4" />
                        </div>
                    </Card>
                )}
            </motion.div>
        </div>
    );
};

export default Homepage;
