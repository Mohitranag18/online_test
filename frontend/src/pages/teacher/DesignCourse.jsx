import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaArrowUp, FaArrowDown, FaPlus } from 'react-icons/fa';
import CourseLayout from './CourseLayout';
import { getModulesByCourseId } from '../../data/mockCourses';

const DesignCourse = () => {
    const { courseId } = useParams();
    const allModules = getModulesByCourseId(courseId);

    const [selectedModules, setSelectedModules] = useState([]);
    const [poolModules, setPoolModules] = useState([]);
    const [selectedInSelected, setSelectedInSelected] = useState(null);
    const [selectedInPool, setSelectedInPool] = useState(null);

    useEffect(() => {
        // Initialize: first module selected, rest in pool
        if (allModules.length > 0) {
            setSelectedModules([allModules[0]]);
            setPoolModules(allModules.slice(1));
        }
    }, [courseId]);

    const moveUp = () => {
        if (selectedInSelected !== null) {
            const index = selectedModules.findIndex(m => m.id === selectedInSelected);
            if (index > 0) {
                const newModules = [...selectedModules];
                [newModules[index], newModules[index - 1]] = [newModules[index - 1], newModules[index]];
                setSelectedModules(newModules);
            }
        }
    };

    const moveDown = () => {
        if (selectedInSelected !== null) {
            const index = selectedModules.findIndex(m => m.id === selectedInSelected);
            if (index < selectedModules.length - 1) {
                const newModules = [...selectedModules];
                [newModules[index], newModules[index + 1]] = [newModules[index + 1], newModules[index]];
                setSelectedModules(newModules);
            }
        }
    };

    const removeModule = () => {
        if (selectedInSelected !== null) {
            const module = selectedModules.find(m => m.id === selectedInSelected);
            setSelectedModules(selectedModules.filter(m => m.id !== selectedInSelected));
            setPoolModules([...poolModules, module]);
            setSelectedInSelected(null);
        }
    };

    const addModule = () => {
        if (selectedInPool !== null) {
            const module = poolModules.find(m => m.id === selectedInPool);
            setPoolModules(poolModules.filter(m => m.id !== selectedInPool));
            setSelectedModules([...selectedModules, module]);
            setSelectedInPool(null);
        }
    };

    // Toggle selection in Selected Modules
    const handleSelectedClick = (moduleId) => {
        if (selectedInSelected === moduleId) {
            setSelectedInSelected(null);
        } else {
            setSelectedInSelected(moduleId);
        }
    };

    // Toggle selection in Pool Modules
    const handlePoolClick = (moduleId) => {
        if (selectedInPool === moduleId) {
            setSelectedInPool(null);
        } else {
            setSelectedInPool(moduleId);
        }
    };

    return (
        <CourseLayout>
            <div className="mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1">
                    <span className="text-cyan-400">DESIGN THE COURSE</span> <span>the course below →</span>
                </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                {/* Selected Modules */}
                <div className="card p-4 sm:p-6 rounded-xl">
                    <div className="mb-3 sm:mb-4">
                        <h4 className="font-bold text-base sm:text-lg mb-1">Selected Modules</h4>
                        <p className="text-xs sm:text-sm muted">Choose modules and configure your course</p>
                    </div>

                    <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4 min-h-[250px] sm:min-h-[300px]">
                        {selectedModules.map((module) => (
                            <div
                                key={module.id}
                                onClick={() => handleSelectedClick(module.id)}
                                className={`flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg cursor-pointer transition active:scale-95 ${
                                    selectedInSelected === module.id
                                        ? 'bg-blue-600/20 border-2 border-blue-600'
                                        : 'bg-[var(--surface)] border border-[var(--border-subtle)] hover:border-[var(--border-color)]'
                                }`}
                            >
                                <input
                                    type="radio"
                                    checked={selectedInSelected === module.id}
                                    onChange={() => handleSelectedClick(module.id)}
                                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0"
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="font-medium text-sm sm:text-base line-clamp-1">{module.name}</div>
                                    <div className="text-xs muted line-clamp-2">{module.description}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-3 sm:pt-4 border-t border-[var(--border-subtle)]">
                        <button
                            onClick={removeModule}
                            disabled={selectedInSelected === null}
                            className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 bg-red-600 hover:bg-red-700 rounded-lg text-xs sm:text-sm font-medium transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 flex-shrink-0"
                        >
                            <span className="hidden sm:inline">Remove</span>
                            <span className="sm:hidden">Remove</span>
                        </button>
                        <div className="flex gap-1.5 sm:gap-2">
                            <button
                                onClick={moveUp}
                                disabled={selectedInSelected === null}
                                className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 border border-[var(--border-color)] rounded-lg text-xs sm:text-sm font-medium hover:bg-[var(--input-bg)] transition flex items-center justify-center gap-1 sm:gap-1.5 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
                            >
                                <FaArrowUp className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                <span className="hidden md:inline">Up</span>
                            </button>
                            <button
                                onClick={moveDown}
                                disabled={selectedInSelected === null}
                                className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 border border-[var(--border-color)] rounded-lg text-xs sm:text-sm font-medium hover:bg-[var(--input-bg)] transition flex items-center justify-center gap-1 sm:gap-1.5 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
                            >
                                <FaArrowDown className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                <span className="hidden md:inline">Down</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Pool of Modules */}
                <div className="card p-4 sm:p-6 rounded-xl">
                    <div className="mb-3 sm:mb-4">
                        <h4 className="font-bold text-base sm:text-lg mb-1">Pool of Modules</h4>
                        <p className="text-xs sm:text-sm muted">Available modules to add</p>
                    </div>

                    <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4 min-h-[250px] sm:min-h-[300px]">
                        {poolModules.map((module) => (
                            <div
                                key={module.id}
                                onClick={() => handlePoolClick(module.id)}
                                className={`flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg cursor-pointer transition active:scale-95 ${
                                    selectedInPool === module.id
                                        ? 'bg-green-600/20 border-2 border-green-600'
                                        : 'bg-[var(--surface)] border border-[var(--border-subtle)] hover:border-[var(--border-color)]'
                                }`}
                            >
                                <input
                                    type="radio"
                                    checked={selectedInPool === module.id}
                                    onChange={() => handlePoolClick(module.id)}
                                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0"
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="font-medium text-sm sm:text-base line-clamp-1">{module.name}</div>
                                    <div className="text-xs muted line-clamp-2">{module.description}</div>
                                </div>
                            </div>
                        ))}
                        {poolModules.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-center">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[var(--surface)] flex items-center justify-center mb-3 sm:mb-4">
                                    <FaPlus className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--text-muted)]" />
                                </div>
                                <p className="text-xs sm:text-sm text-muted max-w-[200px]">
                                    All modules are selected
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-3 sm:pt-4 border-t border-[var(--border-subtle)]">
                        <button
                            onClick={addModule}
                            disabled={selectedInPool === null}
                            className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 bg-green-600 hover:bg-green-700 rounded-lg text-xs sm:text-sm font-medium transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 flex-shrink-0"
                        >
                            <span className="hidden sm:inline">Add</span>
                            <span className="sm:hidden">Add</span>
                        </button>
                        <div className="flex gap-1.5 sm:gap-2 opacity-50">
                            <button 
                                disabled
                                className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 border border-[var(--border-color)] rounded-lg text-xs sm:text-sm font-medium transition flex items-center justify-center gap-1 sm:gap-1.5 cursor-not-allowed"
                            >
                                <FaArrowUp className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                <span className="hidden md:inline">Up</span>
                            </button>
                            <button 
                                disabled
                                className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 border border-[var(--border-color)] rounded-lg text-xs sm:text-sm font-medium transition flex items-center justify-center gap-1 sm:gap-1.5 cursor-not-allowed"
                            >
                                <FaArrowDown className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                <span className="hidden md:inline">Down</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </CourseLayout>
    );
};

export default DesignCourse;