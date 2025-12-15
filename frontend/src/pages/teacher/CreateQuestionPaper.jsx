import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaArrowUp, FaArrowDown, FaPlus, FaSearch } from 'react-icons/fa';
import CourseLayout from './CourseLayout';

const CreateQuestionPaper = () => {
    const { courseId, moduleId, quizId } = useParams();
    const navigate = useNavigate();

    const [marks, setMarks] = useState(10);
    const [questionType, setQuestionType] = useState('Multiple Choice');
    const [searchQuery, setSearchQuery] = useState('');

    const [selectedQuestions, setSelectedQuestions] = useState([
        { id: 1, name: 'Solar Power', type: 'MCQ' }
    ]);
    const [poolQuestions, setPoolQuestions] = useState([
        { id: 2, name: 'Solar Power', type: 'MCQ' },
        { id: 3, name: 'Check Palindrome', type: 'Coding' },
        { id: 4, name: 'Fibonacci', type: 'Coding' },
    ]);
    const [selectedInSelected, setSelectedInSelected] = useState(null);
    const [selectedInPool, setSelectedInPool] = useState(null);

    const handleSelectedClick = (itemId) => {
        setSelectedInSelected(selectedInSelected === itemId ? null : itemId);
    };

    const handlePoolClick = (itemId) => {
        setSelectedInPool(selectedInPool === itemId ? null : itemId);
    };

    const moveUp = () => {
        if (selectedInSelected !== null) {
            const index = selectedQuestions.findIndex(q => q.id === selectedInSelected);
            if (index > 0) {
                const newQuestions = [...selectedQuestions];
                [newQuestions[index], newQuestions[index - 1]] = [newQuestions[index - 1], newQuestions[index]];
                setSelectedQuestions(newQuestions);
            }
        }
    };

    const moveDown = () => {
        if (selectedInSelected !== null) {
            const index = selectedQuestions.findIndex(q => q.id === selectedInSelected);
            if (index < selectedQuestions.length - 1) {
                const newQuestions = [...selectedQuestions];
                [newQuestions[index], newQuestions[index + 1]] = [newQuestions[index + 1], newQuestions[index]];
                setSelectedQuestions(newQuestions);
            }
        }
    };

    const removeQuestion = () => {
        if (selectedInSelected !== null) {
            const question = selectedQuestions.find(q => q.id === selectedInSelected);
            setSelectedQuestions(selectedQuestions.filter(q => q.id !== selectedInSelected));
            setPoolQuestions([...poolQuestions, question]);
            setSelectedInSelected(null);
        }
    };

    const addQuestion = () => {
        if (selectedInPool !== null) {
            const question = poolQuestions.find(q => q.id === selectedInPool);
            setPoolQuestions(poolQuestions.filter(q => q.id !== selectedInPool));
            setSelectedQuestions([...selectedQuestions, question]);
            setSelectedInPool(null);
        }
    };

    const handleSearch = () => {
        console.log('Search:', searchQuery);
    };

    const handlePublish = () => {
        console.log('Publish question paper');
        navigate(`/teacher/course/${courseId}/module/${moduleId}`);
    };

    const filteredPoolQuestions = poolQuestions.filter(q =>
        q.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <CourseLayout>
            <div className="max-w-7xl">
                {/* Breadcrumb */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 text-sm mb-4">
                        <span className="text-[var(--text-primary)] font-semibold">
                            Introduction to Biology
                        </span>
                        <span className="text-blue-400">→ Module_01</span>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(`/teacher/course/${courseId}/module/${moduleId}`)}
                            className="w-10 h-10 rounded-lg bg-[var(--input-bg)] border border-[var(--border-color)] flex items-center justify-center hover:bg-[var(--border-subtle)] transition"
                        >
                            <FaChevronLeft className="w-4 h-4" />
                        </button>
                        <div>
                            <h2 className="text-xl font-bold mb-1">Science Mid-term Quiz</h2>
                            <p className="text-sm muted">Set questions, set marks and configure your quiz paper</p>
                        </div>
                    </div>
                </div>

                {/* Quiz Question Paper Header */}
                <div className="card p-4 rounded-xl mb-6">
                    <div className="flex items-center gap-4">
                        <div className="font-bold">Quiz Question Paper</div>
                        <div className="text-sm muted">Create and manage your quiz questions</div>
                        
                        <div className="ml-auto flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <label className="text-sm font-medium">Marks:</label>
                                <input
                                    type="number"
                                    value={marks}
                                    onChange={(e) => setMarks(e.target.value)}
                                    className="w-20 px-3 py-1.5 rounded-lg text-sm"
                                />
                            </div>
                            <select
                                value={questionType}
                                onChange={(e) => setQuestionType(e.target.value)}
                                className="px-4 py-1.5 rounded-lg text-sm"
                            >
                                <option>Multiple Choice</option>
                                <option>True/False</option>
                                <option>Coding</option>
                                <option>Essay</option>
                            </select>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search from Pool..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 pr-4 py-1.5 rounded-lg text-sm w-64"
                                />
                                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                            </div>
                            <button
                                onClick={handleSearch}
                                className="px-4 py-1.5 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-medium transition"
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Selected Questions */}
                    <div className="card p-6 rounded-xl">
                        <div className="mb-4">
                            <h4 className="font-bold text-lg mb-1">Selected Questions</h4>
                            <p className="text-sm muted">Chosen questions from the Question Bank</p>
                        </div>

                        <div className="space-y-3 mb-4 min-h-[350px] max-h-[450px] overflow-y-auto scrollbar-hide">
                            {selectedQuestions.map((question) => (
                                <div
                                    key={question.id}
                                    onClick={() => handleSelectedClick(question.id)}
                                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
                                        selectedInSelected === question.id
                                            ? 'bg-blue-600/20 border-2 border-blue-600'
                                            : 'bg-[var(--surface)] border border-[var(--border-subtle)]'
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        checked={selectedInSelected === question.id}
                                        onChange={() => handleSelectedClick(question.id)}
                                        className="w-4 h-4 text-blue-600"
                                    />
                                    <div className="flex-1">
                                        <div className="font-medium">{question.name}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
                            <button
                                onClick={removeQuestion}
                                disabled={selectedInSelected === null}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Remove
                            </button>
                            <div className="flex gap-2">
                                <button
                                    onClick={moveUp}
                                    disabled={selectedInSelected === null}
                                    className="px-4 py-2 border border-[var(--border-color)] rounded-lg text-sm font-medium hover:bg-[var(--input-bg)] transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <FaArrowUp className="w-3 h-3" />
                                    Up
                                </button>
                                <button
                                    onClick={moveDown}
                                    disabled={selectedInSelected === null}
                                    className="px-4 py-2 border border-[var(--border-color)] rounded-lg text-sm font-medium hover:bg-[var(--input-bg)] transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <FaArrowDown className="w-3 h-3" />
                                    Down
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Pool of Quizzes/Lessons */}
                    <div className="card p-6 rounded-xl">
                        <div className="mb-4">
                            <h4 className="font-bold text-lg mb-1">Pool of Quizzes/Lessons</h4>
                            <p className="text-sm muted">Quizzes/Lessons available</p>
                        </div>

                        <div className="space-y-3 mb-4 min-h-[350px] max-h-[450px] overflow-y-auto scrollbar-hide">
                            {filteredPoolQuestions.map((question) => (
                                <div
                                    key={question.id}
                                    onClick={() => handlePoolClick(question.id)}
                                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
                                        selectedInPool === question.id
                                            ? 'bg-green-600/20 border-2 border-green-600'
                                            : 'bg-[var(--surface)] border border-[var(--border-subtle)]'
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        checked={selectedInPool === question.id}
                                        onChange={() => handlePoolClick(question.id)}
                                        className="w-4 h-4 text-blue-600"
                                    />
                                    <div className="flex-1">
                                        <div className="font-medium">{question.name}</div>
                                    </div>
                                </div>
                            ))}
                            {filteredPoolQuestions.length === 0 && (
                                <div className="text-center py-8 text-muted text-sm">
                                    {searchQuery ? 'No matching questions found' : 'All questions are selected'}
                                </div>
                            )}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
                            <button
                                onClick={addQuestion}
                                disabled={selectedInPool === null}
                                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Add
                            </button>
                            <div className="flex gap-2">
                                <button className="px-4 py-2 border border-[var(--border-color)] rounded-lg text-sm font-medium hover:bg-[var(--input-bg)] transition flex items-center gap-2 opacity-50 cursor-not-allowed">
                                    <FaArrowUp className="w-3 h-3" />
                                    Up
                                </button>
                                <button className="px-4 py-2 border border-[var(--border-color)] rounded-lg text-sm font-medium hover:bg-[var(--input-bg)] transition flex items-center gap-2 opacity-50 cursor-not-allowed">
                                    <FaArrowDown className="w-3 h-3" />
                                    Down
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={() => navigate(`/teacher/course/${courseId}/module/${moduleId}`)}
                        className="border border-[var(--border-color)] px-6 py-2.5 rounded-lg font-medium hover:bg-[var(--input-bg)] transition flex items-center gap-2"
                    >
                        <FaChevronLeft className="w-4 h-4" />
                        Prev
                    </button>
                    <button
                        onClick={handlePublish}
                        className="bg-blue-600 text-white px-8 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Publish
                    </button>
                </div>
            </div>
        </CourseLayout>
    );
};

export default CreateQuestionPaper;