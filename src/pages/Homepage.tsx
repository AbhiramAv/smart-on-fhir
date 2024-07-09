import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import Card from '../components/Card';

const Homepage: React.FC = () => {
    const [selectedQuestionnaire, setSelectedQuestionnaire] = useState<string | null>(null);
    const [selectedResponse, setSelectedResponse] = useState<string | null>(null);

    const handleQuestionnaireClick = (title: string) => {
        setSelectedQuestionnaire(title);
        setSelectedResponse(null);
    };

    const handleResponseClick = (title: string) => {
        setSelectedResponse(title);
        setSelectedQuestionnaire(null);
    };

    const questionnaires = ['Questionnaire 1', 'Questionnaire 2', 'Questionnaire 3', 'Questionnaire 4', 'Questionnaire 5'];
    const responses = ['Response 1', 'Response 2', 'Response 3'];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-1 space-y-6"
            >
                <Card title="Questionnaires">
                    <ul className="list-none space-y-3 max-h-32 overflow-y-auto">
                        {questionnaires.map((item, index) => (
                            <li
                                key={index}
                                className="flex items-center cursor-pointer hover:text-blue-600"
                                onClick={() => handleQuestionnaireClick(item)}
                            >
                                <FaArrowRight className="mr-2" /> {item}
                            </li>
                        ))}
                    </ul>
                </Card>
                <Card title="Questionnaire Responses">
                    <ul className="list-none space-y-3 max-h-32 overflow-y-auto">
                        {responses.map((item, index) => (
                            <li
                                key={index}
                                className="flex items-center cursor-pointer hover:text-blue-600"
                                onClick={() => handleResponseClick(item)}
                            >
                                <FaArrowRight className="mr-2" /> {item}
                            </li>
                        ))}
                    </ul>
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
