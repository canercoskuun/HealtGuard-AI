// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from 'react';

import * as echarts from 'echarts';
interface Symptom {
    id: string;
    name: string;
}
interface Condition {
    name: string;
    match: number;
    severity: 'low' | 'medium' | 'high';
    description: string;
}
const App: React.FC = () => {
    const [symptoms, setSymptoms] = useState<Symptom[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [duration, setDuration] = useState('');
    const [severity, setSeverity] = useState(5);
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [conditions, setConditions] = useState<Condition[]>([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showGenderDropdown, setShowGenderDropdown] = useState(false);
    const [showDurationDropdown, setShowDurationDropdown] = useState(false);
    const commonSymptoms = [
        "abdominal_pain",
        "abnormal_menstruation",
        "acidity",
        "acute_liver_failure",
        "altered_sensorium",
        "anxiety",
        "back_pain",
        "belly_pain",
        "blackheads",
        "bladder_discomfort",
        "blister",
        "blood_in_sputum",
        "bloody_stool",
        "blurred_and_distorted_vision",
        "breathlessness",
        "brittle_nails",
        "bruising",
        "burning_micturition",
        "chest_pain",
        "chills",
        "cold_hands_and_feets",
        "coma",
        "congestion",
        "constipation",
        "continuous_feel_of_urine",
        "continuous_sneezing",
        "cough",
        "cramps",
        "dark_urine",
        "dehydration",
        "depression",
        "diarrhoea",
        "dischromic_patches",
        "distention_of_abdomen",
        "dizziness",
        "drying_and_tingling_lips",
        "enlarged_thyroid",
        "excessive_hunger",
        "extra_marital_contacts",
        "family_history",
        "fast_heart_rate",
        "fatigue",
        "fluid_overload",
        "foul_smell_ofurine",
        "headache",
        "high_fever",
        "hip_joint_pain",
        "history_of_alcohol_consumption",
        "increased_appetite",
        "indigestion",
        "inflammatory_nails",
        "internal_itching",
        "irregular_sugar_level",
        "irritability",
        "irritation_in_anus",
        "itching",
        "joint_pain",
        "knee_pain",
        "lack_of_concentration",
        "lethargy",
        "loss_of_appetite",
        "loss_of_balance",
        "loss_of_smell",
        "malaise",
        "mild_fever",
        "mood_swings",
        "movement_stiffness",
        "mucoid_sputum",
        "muscle_pain",
        "muscle_wasting",
        "muscle_weakness",
        "nausea",
        "neck_pain",
        "nodal_skin_eruptions",
        "obesity",
        "pain_behind_the_eyes",
        "pain_during_bowel_movements",
        "pain_in_anal_region",
        "painful_walking",
        "palpitations",
        "passage_of_gases",
        "patches_in_throat",
        "phlegm",
        "polyuria",
        "prognosis",
        "prominent_veins_on_calf",
        "puffy_face_and_eyes",
        "pus_filled_pimples",
        "receiving_blood_transfusion",
        "receiving_unsterile_injections",
        "red_sore_around_nose",
        "red_spots_over_body",
        "redness_of_eyes",
        "restlessness",
        "runny_nose",
        "rusty_sputum",
        "scurring",
        "shivering",
        "silver_like_dusting",
        "sinus_pressure",
        "skin_peeling",
        "skin_rash",
        "slurred_speech",
        "small_dents_in_nails",
        "spinning_movements",
        "spotting_urination",
        "stiff_neck",
        "stomach_bleeding",
        "stomach_pain",
        "sunken_eyes",
        "sweating",
        "swelled_lymph_nodes",
        "swelling_joints",
        "swelling_of_stomach",
        "swollen_blood_vessels",
        "swollen_extremeties",
        "swollen_legs",
        "throat_irritation",
        "toxic_look_(typhos)",
        "ulcers_on_tongue",
        "unsteadiness",
        "visual_disturbances",
        "vomiting",
        "watering_from_eyes",
        "weakness_in_limbs",
        "weakness_of_one_body_side",
        "weight_gain",
        "weight_loss",
        "yellow_crust_ooze",
        "yellow_urine",
        "yellowing_of_eyes",
        "yellowish_skin"
    ];
    const suggestedSymptoms = commonSymptoms.filter(symptom =>
        symptom.toLowerCase().includes(searchTerm.toLowerCase()) && searchTerm
    );
    const addSymptom = (symptomName: string) => {
        if (!symptoms.find(s => s.name === symptomName)) {
            setSymptoms([...symptoms, { id: Date.now().toString(), name: symptomName }]);
            setSearchTerm('');
        }
    };
    const removeSymptom = (id: string) => {
        setSymptoms(symptoms.filter(s => s.id !== id));
    };
    const analyzeSymptoms = async () => {
        if (symptoms.length === 0) return;
        setIsAnalyzing(true);

        try {
            const response = await fetch("http://localhost:5000/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    symptoms: symptoms.map(s => s.name).join(','),
                })
            });

            if (!response.ok) {
                throw new Error("API error");
            }

            const data = await response.json();
            console.log("probability " + data.predictions[0].precautions);
            console.log("probability2 " + data.predictions[1].disease);
            console.log("probability3 " + data.predictions[2].disease);
            const top3 = data.predictions
                .sort((a: any, b: any) => b.probability - a.probability)
                .slice(0, 3)
                .map((item: any, index: number) => ({
                    name: item.disease,
                    match: parseInt(item.probability),

                    description: item.description !== "No description" ? item.description : "No description available.",
                    severity:
                        index === 0 ? "High" :
                            index === 1 ? "Medium" :
                                "Low"
                }));

            setConditions(top3);
        } catch (error) {
            console.error("Error analyzing symptoms:", error);
        } finally {
            setIsAnalyzing(false);
        }
    };



    const clearAll = () => {
        setSymptoms([]);
        setSearchTerm('');
        setDuration('');
        setSeverity(1);
        setAge('');
        setGender('');
        setConditions([]);
    };
    useEffect(() => {
        if (conditions.length > 0) {
            const chartDom = document.getElementById('analysisChart');
            if (chartDom) {
                const myChart = echarts.init(chartDom);
                const option = {
                    animation: false,
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b}: {c}% Match'
                    },
                    color: ['#EF4444', '#F59E0B', '#3B82F6'],
                    series: [
                        {
                            name: 'Match Percentage',
                            type: 'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            itemStyle: {
                                borderRadius: 10,
                                borderColor: '#fff',
                                borderWidth: 2
                            },
                            label: {
                                show: true,
                                position: 'outside',
                                formatter: '{b}\n{c}%'
                            },
                            emphasis: {
                                label: {
                                    show: true,
                                    fontSize: 16,
                                    fontWeight: 'bold'
                                }
                            },
                            data: conditions.map((c, index) => ({
                                value: c.match,
                                name: c.name
                            }))
                        }
                    ]
                };
                myChart.setOption(option);
            }
        }
    }, [conditions]);
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 py-8">
                <header className="text-center mb-12">
                    <div className="flex flex-col items-center justify-center mb-4">
                        <i className="fas fa-stethoscope text-4xl text-blue-600 mb-2"></i>
                        <h1 className="text-4xl font-bold text-gray-800">Symptom Checker</h1>
                    </div>
                    <p className="text-xl text-gray-600">Enter your symptoms to get possible conditions</p>
                </header>
                <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                    <div className="relative mb-6">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Type your symptoms here..."
                                className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 text-gray-700"
                            />
                            <i className="fas fa-search absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        </div>
                        {suggestedSymptoms.length > 0 && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                                {suggestedSymptoms.map((symptom) => (
                                    <div
                                        key={symptom}
                                        className="px-4 py-2 cursor-pointer hover:bg-blue-50"
                                        onClick={() => addSymptom(symptom)}
                                    >
                                        {symptom}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {symptoms.map((symptom) => (
                            <div
                                key={symptom.id}
                                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center"
                            >
                                <span>{symptom.name}</span>
                                <button
                                    onClick={() => removeSymptom(symptom.id)}
                                    className="ml-2 text-blue-600 hover:text-blue-800"
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="relative">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                                <button
                                    onClick={() => setShowDurationDropdown(!showDurationDropdown)}
                                    className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg text-left text-gray-700 focus:outline-none focus:border-blue-500 cursor-pointer relative"
                                >
                                    {duration || 'How long have you had these symptoms?'}
                                    <i className="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center h-4"></i>
                                </button>
                            </div>
                            {showDurationDropdown && (
                                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                                    {['Less than a day', '1-3 days', '4-7 days', 'More than a week'].map((option) => (
                                        <div
                                            key={option}
                                            className="px-4 py-2 cursor-pointer hover:bg-blue-50"
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
                            <label className="block text-sm font-medium text-gray-700 mb-1">Severity (1-10)</label>
                            <input
                                type="range"
                                min="1"
                                max="10"
                                value={severity}
                                onChange={(e) => setSeverity(parseInt(e.target.value))}
                                className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>Mild</span>
                                <span>Moderate</span>
                                <span>Severe</span>
                            </div>
                        </div>
                        <div>
                            <input
                                type="number"
                                value={age}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value === '' || (parseInt(value) >= 0 && parseInt(value) <= 120)) {
                                        setAge(value);
                                    }
                                }}
                                min="0"
                                max="120"
                                placeholder="Age"
                                className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 text-gray-700 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                        </div>
                        <div className="relative">
                            <button
                                onClick={() => setShowGenderDropdown(!showGenderDropdown)}
                                className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg text-left text-gray-700 focus:outline-none focus:border-blue-500 cursor-pointer"
                            >
                                {gender || 'Select Gender'}
                                <i className="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center h-4"></i>
                            </button>
                            {showGenderDropdown && (
                                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                                    {['Male', 'Female', 'Other'].map((option) => (
                                        <div
                                            key={option}
                                            className="px-4 py-2 cursor-pointer hover:bg-blue-50"
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
                    <div className="flex gap-4">
                        <button
                            onClick={analyzeSymptoms}
                            disabled={symptoms.length === 0 || isAnalyzing}
                            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-blue-300 !rounded-button whitespace-nowrap cursor-pointer"
                        >
                            {isAnalyzing ? (
                                <span className="flex items-center justify-center">
                                    <i className="fas fa-spinner fa-spin mr-2"></i>
                                    Analyzing...
                                </span>
                            ) : (
                                'Analyze Symptoms'
                            )}
                        </button>
                        <button
                            onClick={clearAll}
                            className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-600 hover:bg-gray-50 transition-colors !rounded-button whitespace-nowrap cursor-pointer"
                        >
                            Clear All
                        </button>
                    </div>
                </div>
                {conditions.length > 0 && (
                    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Analysis Results</h2>
                        <div className="flex gap-8 mt-2">
                            <div id="analysisChart" className="w-1/2 h-[400px]"></div>
                            <div className="w-1/2 space-y-4 max-h-[400px] overflow-y-auto">
                                {conditions.map((condition, index) => (
                                    <div
                                        key={condition.name}
                                        className="border border-gray-200 rounded-lg p-4"
                                        style={{
                                            borderColor: index === 0 ? '#EF4444' : index === 1 ? '#F59E0B' : '#3B82F6'
                                        }}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-xl font-semibold" style={{
                                                color: index === 0 ? '#EF4444' : index === 1 ? '#F59E0B' : '#3B82F6'
                                            }}>{condition.name}</h3>
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${index === 0 ? 'bg-red-100 text-red-800' :
                                                index === 1 ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-blue-100 text-blue-800'
                                                }`}>
                                                {condition.severity.charAt(0).toUpperCase() + condition.severity.slice(1)} Risk
                                            </span>
                                        </div>
                                        <p className="text-gray-600">{condition.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6">
                    <div className="flex items-start">
                        <i className="fas fa-exclamation-circle text-red-600 text-2xl mt-1 mr-4"></i>
                        <p className="text-red-700 text-lg">
                            This symptom checker is for informational purposes only and should not be used as a substitute for professional medical advice, diagnosis, or treatment.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default App
