
// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';


interface Symptom {
    id: string;
    name: string;
}
interface Condition {
    name: string;
    match: number;
    severity: 'Low' | 'Moderate' | 'High';
    description: string;
}
const Classic: React.FC = () => {
    const [symptoms, setSymptoms] = useState<Symptom[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [duration, setDuration] = useState('');
    const [severity, setSeverity] = useState(5);
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [conditions, setConditions] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [showGenderDropdown, setShowGenderDropdown] = useState(false);
    const [matchedConditions, setMatchedConditions] = useState<Condition[]>([]);
    const chartRef = useRef<HTMLDivElement>(null);
    const commonSymptoms = [
        // General Symptoms
        'Headache', 'Fever', 'Fatigue', 'Weakness', 'Dizziness',
        'Loss of Appetite', 'Weight Loss', 'Weight Gain', 'Night Sweats', 'Chills',
        'Fainting', 'Excessive Thirst', 'Excessive Hunger', 'Sleep Problems', 'Drowsiness',
        // Pain Related
        'Chest Pain', 'Back Pain', 'Joint Pain', 'Muscle Pain', 'Abdominal Pain',
        'Neck Pain', 'Shoulder Pain', 'Hip Pain', 'Knee Pain', 'Ankle Pain',
        'Tooth Pain', 'Ear Pain', 'Eye Pain', 'Throat Pain', 'Pelvic Pain',
        // Respiratory
        'Cough', 'Shortness of Breath', 'Wheezing', 'Rapid Breathing', 'Sore Throat',
        'Runny Nose', 'Stuffy Nose', 'Sneezing', 'Post Nasal Drip', 'Coughing Blood',
        // Digestive
        'Nausea', 'Vomiting', 'Diarrhea', 'Constipation', 'Bloating',
        'Heartburn', 'Indigestion', 'Gas', 'Stomach Cramps', 'Blood in Stool',
        // Neurological
        'Memory Problems', 'Confusion', 'Difficulty Speaking', 'Tremors', 'Seizures',
        'Balance Problems', 'Numbness', 'Tingling', 'Vision Changes', 'Hearing Changes',
        // Skin Related
        'Rash', 'Itching', 'Hives', 'Dry Skin', 'Excessive Sweating',
        'Skin Discoloration', 'Bruising', 'Skin Lumps', 'Hair Loss', 'Nail Changes',
        // Cardiovascular
        'Heart Palpitations', 'Irregular Heartbeat', 'Leg Swelling', 'Cold Extremities', 'Varicose Veins',
        'High Blood Pressure', 'Low Blood Pressure', 'Poor Circulation', 'Chest Tightness', 'Cyanosis',
        // Psychological
        'Anxiety', 'Depression', 'Mood Swings', 'Irritability', 'Stress',
        'Panic Attacks', 'Difficulty Concentrating', 'Racing Thoughts', 'Hallucinations', 'Paranoia',
        // Urinary
        'Frequent Urination', 'Painful Urination', 'Blood in Urine', 'Urinary Urgency', 'Incontinence',
        'Decreased Urination', 'Cloudy Urine', 'Strong Urine Odor', 'Bladder Pain', 'Kidney Pain',
        // Musculoskeletal
        'Muscle Weakness', 'Joint Stiffness', 'Muscle Cramps', 'Bone Pain', 'Limited Range of Motion',
        'Muscle Twitching', 'Joint Swelling', 'Muscle Wasting', 'Poor Posture', 'Gait Problems',
        // Reproductive
        'Menstrual Changes', 'Vaginal Discharge', 'Erectile Dysfunction', 'Loss of Libido', 'Breast Changes',
        'Testicular Pain', 'Irregular Periods', 'Hot Flashes', 'Vaginal Dryness', 'Breast Pain',
        // ENT Related
        'Tinnitus', 'Vertigo', 'Hoarseness', 'Difficulty Swallowing', 'Bad Breath',
        'Nose Bleeds', 'Sinus Pressure', 'Ear Discharge', 'Loss of Smell', 'Loss of Taste',
        // Eye Related
        'Blurred Vision', 'Double Vision', 'Eye Redness', 'Eye Discharge', 'Light Sensitivity',
        'Floaters', 'Eye Strain', 'Night Vision Problems', 'Color Blindness', 'Eye Twitching'
    ];
    const suggestedSymptoms = commonSymptoms.filter(symptom =>
        symptom.toLowerCase().includes(searchTerm.toLowerCase()) && searchTerm
    );
    const addSymptom = (symptomName: string) => {
        if (!symptoms.find(s => s.name === symptomName)) {
            setSymptoms([...symptoms, { id: Date.now().toString(), name: symptomName }]);
        }
        setSearchTerm('');
    };
    const removeSymptom = (id: string) => {
        setSymptoms(symptoms.filter(symptom => symptom.id !== id));
    };
    const handleAnalyze = () => {
        if (symptoms.length === 0) return;
        setIsAnalyzing(true);
        setShowResults(false);
        // Simulated analysis
        setTimeout(() => {
            const sampleConditions: Condition[] = [
                {
                    name: 'Common Cold',
                    match: 85,
                    severity: 'Low',
                    description: 'A viral infection causing upper respiratory symptoms'
                },
                {
                    name: 'Seasonal Allergies',
                    match: 72,
                    severity: 'Moderate',
                    description: 'Allergic reaction to environmental triggers'
                },
                {
                    name: 'Viral Sinusitis',
                    match: 65,
                    severity: 'Low',
                    description: 'Inflammation of the sinus cavities'
                }
            ];
            setMatchedConditions(sampleConditions);
            setIsAnalyzing(false);
            setShowResults(true);
        }, 2000);
    };
    const resetForm = () => {
        setSymptoms([]);
        setSearchTerm('');
        setDuration('');
        setSeverity(5);
        setAge('');
        setGender('');
        setConditions('');
        setShowResults(false);
    };
    useEffect(() => {
        if (showResults && chartRef.current) {
            const chart = echarts.init(chartRef.current);
            const option = {
                animation: false,
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    max: 100
                },
                yAxis: {
                    type: 'category',
                    data: matchedConditions.map(c => c.name)
                },
                series: [
                    {
                        name: 'Match Percentage',
                        type: 'bar',
                        data: matchedConditions.map(c => c.match),
                        itemStyle: {
                            color: '#3B82F6'
                        }
                    }
                ]
            };
            chart.setOption(option);
            return () => {
                chart.dispose();
            };
        }
    }, [showResults, matchedConditions]);
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center mb-4">
                        <i className="fas fa-stethoscope text-blue-600 text-5xl"></i>


                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Symptom Checker</h1>
                    <p className="text-xl text-gray-600">Enter your symptoms to get possible conditions</p>
                </div>
                {/* Main Content */}
                <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                    {/* Symptom Input */}
                    <div className="mb-8">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Type your symptoms here..."
                                className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={() => {
                                    const isValidSymptom = commonSymptoms.some(
                                        symptom => symptom.toLowerCase() === searchTerm.toLowerCase()
                                    );
                                    if (isValidSymptom) {
                                        addSymptom(searchTerm);
                                    }
                                }}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-800 cursor-pointer !rounded-button whitespace-nowrap"
                                disabled={!commonSymptoms.some(symptom => symptom.toLowerCase() === searchTerm.toLowerCase())}
                            >
                                <i className="fas fa-plus"></i>
                            </button>
                        </div>
                        {/* Suggested Symptoms */}
                        {suggestedSymptoms.length > 0 && (
                            <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-sm">
                                {suggestedSymptoms.map((symptom) => (
                                    <div
                                        key={symptom}
                                        className="p-2 hover:bg-gray-50 cursor-pointer"
                                        onClick={() => addSymptom(symptom)}
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
                                    key={symptom.id}
                                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center"
                                >
                                    {symptom.name}
                                    <button
                                        onClick={() => removeSymptom(symptom.id)}
                                        className="ml-2 text-blue-600 hover:text-blue-800 cursor-pointer !rounded-button whitespace-nowrap"
                                    >
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Additional Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div>
                            <label className="block text-gray-700 mb-2">Duration</label>
                            <input
                                type="text"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                placeholder="How long have you had these symptoms?"
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            />
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
                            <div className="flex justify-between text-sm text-gray-600">
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
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div className="relative">
                            <label className="block text-gray-700 mb-2">Gender</label>
                            <button
                                onClick={() => setShowGenderDropdown(!showGenderDropdown)}
                                className="w-full p-3 border border-gray-300 rounded-lg text-left bg-white flex justify-between items-center cursor-pointer !rounded-button whitespace-nowrap"
                            >
                                {gender || 'Select gender'}
                                <i className="fas fa-chevron-down"></i>
                            </button>
                            {showGenderDropdown && (
                                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                                    {['Male', 'Female', 'Other'].map((option) => (
                                        <div
                                            key={option}
                                            className="p-3 hover:bg-gray-50 cursor-pointer"
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
                    <div className="flex gap-4 mb-8">
                        <button
                            onClick={handleAnalyze}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center flex-1 !rounded-button whitespace-nowrap"
                            disabled={isAnalyzing}
                        >
                            {isAnalyzing ? (
                                <i className="fas fa-spinner fa-spin mr-2"></i>
                            ) : (
                                <i className="fas fa-search mr-2"></i>
                            )}
                            Analyze Symptoms
                        </button>
                        <button
                            onClick={resetForm}
                            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 !rounded-button whitespace-nowrap"
                        >
                            Clear All
                        </button>
                    </div>
                    {/* Results Section */}
                    {showResults && (
                        <div className="border-t pt-8">
                            <h2 className="text-2xl font-bold mb-6">Analysis Results</h2>
                            <div ref={chartRef} style={{ height: '300px' }} className="mb-8"></div>
                            <div className="space-y-4">
                                {matchedConditions.map((condition) => (
                                    <div
                                        key={condition.name}
                                        className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-xl font-semibold">{condition.name}</h3>
                                            <span className={`px-3 py-1 rounded-full text-sm ${condition.severity === 'Low' ? 'bg-green-100 text-green-800' :
                                                condition.severity === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                {condition.severity} Risk
                                            </span>
                                        </div>
                                        <p className="text-gray-600">{condition.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                {/* Disclaimer */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <h3 className="text-red-800 font-bold mb-2">Important Medical Disclaimer</h3>
                    <p className="text-red-700">
                        This tool is for informational purposes only and should not be used as a substitute for professional medical advice.
                        If you are experiencing severe symptoms, please seek immediate medical attention or call emergency services.
                    </p>
                </div>
            </div>
        </div>
    );
};
export default Classic;
