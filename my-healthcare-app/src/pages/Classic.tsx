// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
const App: React.FC = () => {
    const [symptoms, setSymptoms] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [duration, setDuration] = useState('');
    const [severity, setSeverity] = useState(5);
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [conditions, setConditions] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [showGenderDropdown, setShowGenderDropdown] = useState(false);
    const [showDurationDropdown, setShowDurationDropdown] = useState(false);
    const chartRef = useRef<HTMLDivElement>(null);
    const commonSymptoms = [
        'Headache', 'Fever', 'Cough', 'Fatigue', 'Nausea',
        'Dizziness', 'Shortness of breath', 'Body aches', 'Sore throat'
    ];
    const suggestedSymptoms = commonSymptoms.filter(
        symptom => symptom.toLowerCase().includes(inputValue.toLowerCase()) && inputValue
    );
    useEffect(() => {
        if (showResults && chartRef.current) {
            const chart = echarts.init(chartRef.current);
            const option = {
                animation: false,
                title: {
                    text: 'Condition Match Analysis',
                    left: 'center',
                    top: 20,
                    textStyle: {
                        color: '#334155'
                    }
                },
                tooltip: {
                    trigger: 'item'
                },
                series: [
                    {
                        name: 'Match Probability',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: 20,
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: 48, name: 'Common Cold' },
                            { value: 32, name: 'Seasonal Allergies' },
                            { value: 20, name: 'Sinusitis' }
                        ]
                    }
                ]
            };
            chart.setOption(option);
        }
    }, [showResults]);
    const handleAddSymptom = (symptom: string) => {
        if (!symptoms.includes(symptom) && symptom.trim()) {
            setSymptoms([...symptoms, symptom]);
            setInputValue('');
        }
    };
    const handleRemoveSymptom = (symptomToRemove: string) => {
        setSymptoms(symptoms.filter(symptom => symptom !== symptomToRemove));
    };
    const handleAnalyze = () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            setIsAnalyzing(false);
            setShowResults(true);
        }, 2000);
    };
    const handleClear = () => {
        setSymptoms([]);
        setInputValue('');
        setDuration('');
        setSeverity(5);
        setAge('');
        setGender('');
        setConditions('');
        setShowResults(false);
    };
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-block text-blue-600 mb-4">
                        <i className="fas fa-stethoscope text-5xl"></i>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Symptom Checker</h1>
                    <p className="text-xl text-gray-600">Enter your symptoms to get possible conditions</p>
                </div>
                {/* Main Content */}
                <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                    {/* Symptom Input */}
                    <div className="mb-8">
                        <div className="relative">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Type your symptoms here..."
                                className="w-full px-6 py-4 text-lg border-2 border-blue-100 rounded-lg focus:outline-none focus:border-blue-500"
                            />
                            <button
                                onClick={() => handleAddSymptom(inputValue)}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-800 cursor-pointer !rounded-button"
                            >
                                <i className="fas fa-plus text-xl"></i>
                            </button>
                        </div>
                        {/* Suggested Symptoms */}
                        {suggestedSymptoms.length > 0 && inputValue && (
                            <div className="mt-2 bg-white shadow-lg rounded-lg border border-gray-200">
                                {suggestedSymptoms.map((symptom) => (
                                    <div
                                        key={symptom}
                                        className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                                        onClick={() => handleAddSymptom(symptom)}
                                    >
                                        {symptom}
                                    </div>
                                ))}
                            </div>
                        )}
                        {/* Selected Symptoms */}
                        <div className="flex flex-wrap gap-2 mt-4">
                            {symptoms.map((symptom) => (
                                <div
                                    key={symptom}
                                    className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full flex items-center"
                                >
                                    {symptom}
                                    <button
                                        onClick={() => handleRemoveSymptom(symptom)}
                                        className="ml-2 text-blue-600 hover:text-blue-800 cursor-pointer !rounded-button"
                                    >
                                        <i className="fas fa-xmark"></i>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Additional Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div className="relative">
                            <label className="block text-gray-700 mb-2">Duration</label>
                            <button
                                onClick={() => setShowDurationDropdown(!showDurationDropdown)}
                                className="w-full px-4 py-3 text-left bg-white border-2 border-gray-200 rounded-lg focus:outline-none cursor-pointer !rounded-button"
                            >
                                {duration || 'Select duration'}
                                <i className="fas fa-angle-down absolute right-4 top-1/2 transform -translate-y-1/2"></i>
                            </button>
                            {showDurationDropdown && (
                                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                                    {['Less than a day', '1-3 days', '4-7 days', 'More than a week'].map((option) => (
                                        <div
                                            key={option}
                                            className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                                            onClick={() => {
                                                setDuration(option);
                                                setShowDurationDropdown(false);
                                            }}
                                        >
                                            {option}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Severity (1-10)</label>
                            <input
                                type="range"
                                min="1"
                                max="10"
                                value={severity}
                                onChange={(e) => setSeverity(parseInt(e.target.value))}
                                className="w-full"
                            />
                            <div className="flex justify-between text-gray-600">
                                <span>Mild</span>
                                <span>Moderate</span>
                                <span>Severe</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Age</label>
                            <input
                                type="number"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                placeholder="Enter your age"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none"
                            />
                        </div>
                        <div className="relative">
                            <label className="block text-gray-700 mb-2">Gender</label>
                            <button
                                onClick={() => setShowGenderDropdown(!showGenderDropdown)}
                                className="w-full px-4 py-3 text-left bg-white border-2 border-gray-200 rounded-lg focus:outline-none cursor-pointer !rounded-button"
                            >
                                {gender || 'Select gender'}
                                <i className="fas fa-angle-down absolute right-4 top-1/2 transform -translate-y-1/2"></i>
                            </button>
                            {showGenderDropdown && (
                                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                                    {['Male', 'Female', 'Other'].map((option) => (
                                        <div
                                            key={option}
                                            className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                                            onClick={() => {
                                                setGender(option);
                                                setShowGenderDropdown(false);
                                            }}
                                        >
                                            {option}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Action Buttons */}
                    <div className="flex gap-4 justify-center mb-8">
                        <button
                            onClick={handleAnalyze}
                            disabled={symptoms.length === 0 || isAnalyzing}
                            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center !rounded-button whitespace-nowrap"
                        >
                            {isAnalyzing ? (
                                <>
                                    <i className="fas fa-circle-notch fa-spin mr-2"></i>
                                    Analyzing...
                                </>
                            ) : (
                                'Analyze Symptoms'
                            )}
                        </button>
                        <button
                            onClick={handleClear}
                            className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 !rounded-button whitespace-nowrap"
                        >
                            Clear All
                        </button>
                    </div>
                    {/* Results Section */}
                    {showResults && (
                        <div className="border-t pt-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Analysis Results</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div ref={chartRef} className="h-80"></div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-4">Possible Conditions</h3>
                                    <div className="space-y-4">
                                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-medium">Common Cold</span>
                                                <span className="text-green-600">48% match</span>
                                            </div>
                                            <p className="text-sm text-gray-600">
                                                Matches symptoms: Cough, Sore throat, Fatigue
                                            </p>
                                        </div>
                                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-medium">Seasonal Allergies</span>
                                                <span className="text-blue-600">32% match</span>
                                            </div>
                                            <p className="text-sm text-gray-600">
                                                Matches symptoms: Cough, Shortness of breath
                                            </p>
                                        </div>
                                        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-medium">Sinusitis</span>
                                                <span className="text-yellow-600">20% match</span>
                                            </div>
                                            <p className="text-sm text-gray-600">
                                                Matches symptoms: Headache, Fatigue
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                {/* Disclaimer */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                    <h3 className="text-xl font-bold text-red-800 mb-4">Important Medical Disclaimer</h3>
                    <p className="text-red-700 mb-4">
                        This symptom checker is for informational purposes only and should not be used as a substitute
                        for professional medical advice, diagnosis, or treatment.
                    </p>
                    <p className="text-red-700 font-bold">
                        If you are experiencing severe symptoms or believe you have a medical emergency,
                        please call emergency services (911) or visit the nearest emergency room immediately.
                    </p>
                </div>
            </div>
        </div>
    );
};
export default App
