// DesignModule.jsx - Updated with two-column layout like AddQuiz
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowUp, FaArrowDown, FaSearch } from 'react-icons/fa';
import ModuleLayout from './ModuleLayout';
import { getModuleById } from '../../data/mockCourses';

const DesignModule = () => {
    const { courseId, moduleId } = useParams();
    const navigate = useNavigate();
    
    const module = getModuleById(courseId, moduleId);
    const allItems = module?.events || [];

    const [selectedItems, setSelectedItems] = useState([]);
    const [poolItems, setPoolItems] = useState([]);
    const [selectedInSelected, setSelectedInSelected] = useState(null);
    const [selectedInPool, setSelectedInPool] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [shuffleAll, setShuffleAll] = useState(false);
    const [shuffleMCQ, setShuffleMCQ] = useState(false);

    useEffect(() => {
        // Initialize: first item selected, rest in pool
        if (allItems.length > 0) {
            setSelectedItems([allItems[0]]);
            setPoolItems(allItems.slice(1));
        }
    }, [courseId, moduleId]);

    const handleSelectedClick = (itemId) => {
        if (selectedInSelected === itemId) {
            setSelectedInSelected(null);
        } else {
            setSelectedInSelected(itemId);
        }
    };

    const handlePoolClick = (itemId) => {
        if (selectedInPool === itemId) {
            setSelectedInPool(null);
        } else {
            setSelectedInPool(itemId);
        }
    };

    const moveUp = () => {
        if (selectedInSelected !== null) {
            const index = selectedItems.findIndex(m => m.id === selectedInSelected);
            if (index > 0) {
                const newItems = [...selectedItems];
                [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
                setSelectedItems(newItems);
            }
        }
    };

    const moveDown = () => {
        if (selectedInSelected !== null) {
            const index = selectedItems.findIndex(m => m.id === selectedInSelected);
            if (index < selectedItems.length - 1) {
                const newItems = [...selectedItems];
                [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
                setSelectedItems(newItems);
            }
        }
    };

    const removeItem = () => {
        if (selectedInSelected !== null) {
            const item = selectedItems.find(m => m.id === selectedInSelected);
            setSelectedItems(selectedItems.filter(m => m.id !== selectedInSelected));
            setPoolItems([...poolItems, item]);
            setSelectedInSelected(null);
        }
    };

    const addItem = () => {
        if (selectedInPool !== null) {
            const item = poolItems.find(m => m.id === selectedInPool);
            setPoolItems(poolItems.filter(m => m.id !== selectedInPool));
            setSelectedItems([...selectedItems, item]);
            setSelectedInPool(null);
        }
    };

    const handlePublish = () => {
        console.log('Publishing module with items:', selectedItems);
        navigate(`/teacher/course/${courseId}/modules`);
    };

    const filteredPoolItems = poolItems.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSaveDraft = () => {
        console.log('Save draft:', { selectedItems, shuffleAll, shuffleMCQ });
    };

    return (
        <ModuleLayout>
            {/* Main Card */}
            <div className="card-strong rounded-2xl overflow-hidden">
                {/* Card Header */}
                <div className="flex items-center justify-between p-6 border-b border-[var(--border-color)]">
                    <div>
                        <h2 className="text-xl font-bold mb-1">Design Module</h2>
                        <p className="text-sm muted">
                            Organize quizzes and lessons for this module
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                            <input
                                type="text"
                                placeholder="Search from Pool..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-64 pl-10 pr-4 py-2 rounded-lg text-sm"
                            />
                        </div>
                        <button 
                            className="bg-violet-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition text-sm flex items-center gap-2"
                        >
                            <FaSearch className="w-4 h-4" />
                            Search from Pool
                        </button>
                    </div>
                </div>

                {/* Form Content */}
                <div className="p-8">
                    <div className="grid lg:grid-cols-2 gap-6">
                        {/* Left Column - Selected Quizzes/Lessons */}
                        <div>
                            <div className="mb-6">
                                <h3 className="text-lg font-bold mb-1">Selected Quizzes/Lessons</h3>
                                <p className="text-sm muted">Chosen quizzes/lessons</p>
                            </div>

                            <div className="space-y-3 mb-4 min-h-[300px] max-h-[400px] overflow-y-auto bg-[var(--input-bg)] border border-[var(--border-color)] rounded-lg p-4">
                                {selectedItems.length === 0 ? (
                                    <p className="text-sm muted text-center py-8">No items selected</p>
                                ) : (
                                    selectedItems.map((item) => (
                                        <div
                                            key={item.id}
                                            onClick={() => handleSelectedClick(item.id)}
                                            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
                                                selectedInSelected === item.id
                                                    ? 'bg-blue-600/20 border-2 border-blue-600'
                                                    : 'bg-[var(--surface)] border border-[var(--border-subtle)]'
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                checked={selectedInSelected === item.id}
                                                onChange={() => handleSelectedClick(item.id)}
                                                className="w-4 h-4 text-blue-600"
                                            />
                                            <div className="flex-1">
                                                <div className="font-medium">{item.name}</div>
                                                <div className="text-xs muted">{item.type}</div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
                                <button
                                    onClick={removeItem}
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

                            {/* Shuffle Options */}
                            <div className="space-y-4 border-t border-[var(--border-color)] pt-4 mt-4">
                                <div className="p-4 rounded-lg bg-[var(--input-bg)] border border-[var(--border-color)]">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-semibold mb-1">Shuffle All</div>
                                            <div className="text-xs muted">for this module</div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={shuffleAll}
                                                onChange={(e) => setShuffleAll(e.target.checked)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-[var(--surface)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>
                                </div>

                                
                            </div>
                        </div>

                        {/* Right Column - Pool of Quizzes/Lessons */}
                        <div>
                            <div className="mb-6">
                                <h3 className="text-lg font-bold mb-1">Pool of Quizzes/Lessons</h3>
                                <p className="text-sm muted">Quizzes/Lessons available</p>
                            </div>

                        
                            <div className="space-y-3 mb-4 min-h-[300px] max-h-[400px] overflow-y-auto bg-[var(--input-bg)] border border-[var(--border-color)] rounded-lg p-4">
                                {filteredPoolItems.length === 0 ? (
                                    <div className="text-center py-8 text-muted text-sm">
                                        {searchQuery ? 'No matching items found' : 'All items are selected'}
                                    </div>
                                ) : (
                                    filteredPoolItems.map((item) => (
                                        <div
                                            key={item.id}
                                            onClick={() => handlePoolClick(item.id)}
                                            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
                                                selectedInPool === item.id
                                                    ? 'bg-green-600/20 border-2 border-green-600'
                                                    : 'bg-[var(--surface)] border border-[var(--border-subtle)]'
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                checked={selectedInPool === item.id}
                                                onChange={() => handlePoolClick(item.id)}
                                                className="w-4 h-4 text-blue-600"
                                            />
                                            <div className="flex-1">
                                                <div className="font-medium">{item.name}</div>
                                                <div className="text-xs muted">{item.type}</div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            
                            <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
                                <button
                                    onClick={addItem}
                                    disabled={selectedInPool === null}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Add
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
                            <div className="space-y-4 border-t border-[var(--border-color)] pt-4 mt-4">
                                

                                <div className="p-4 rounded-lg bg-[var(--input-bg)] border border-[var(--border-color)]">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-semibold mb-1">Shuffle only MCQ/MCC</div>
                                            <div className="text-xs muted">for each student</div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={shuffleMCQ}
                                                onChange={(e) => setShuffleMCQ(e.target.checked)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-[var(--surface)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Action Buttons */}
                    <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-[var(--border-color)]">
                        <button
                            onClick={() => navigate(`/teacher/course/${courseId}/modules`)}
                            className="border border-[var(--border-color)] px-6 py-2.5 rounded-lg font-medium hover:bg-[var(--input-bg)] transition"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handlePublish}
                            className="bg-blue-600 text-white px-8 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
                        >
                            Publish
                        </button>
                    </div>
                </div>
            </div>
        </ModuleLayout>
    );
};

export default DesignModule;