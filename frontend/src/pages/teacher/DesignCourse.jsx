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
            setSelectedInSelected(null); // Deselect if already selected
        } else {
            setSelectedInSelected(moduleId); // Select if not selected
        }
    };

    // Toggle selection in Pool Modules
    const handlePoolClick = (moduleId) => {
        if (selectedInPool === moduleId) {
            setSelectedInPool(null); // Deselect if already selected
        } else {
            setSelectedInPool(moduleId); // Select if not selected
        }
    };

    return (
        <CourseLayout>
            <div className="mb-6">
                <h3 className="text-lg font-bold mb-1">
                    <span className="text-cyan-400">DESIGN THE COURSE</span> the course below →
                </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Selected Modules */}
                <div className="card p-6 rounded-xl">
                    <div className="mb-4">
                        <h4 className="font-bold text-lg mb-1">Selected Modules</h4>
                        <p className="text-sm muted">Choose modules and configure your course</p>
                    </div>

                    <div className="space-y-3 mb-4 min-h-[300px]">
                        {selectedModules.map((module) => (
                            <div
                                key={module.id}
                                onClick={() => handleSelectedClick(module.id)}
                                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
                                    selectedInSelected === module.id
                                        ? 'bg-blue-600/20 border-2 border-blue-600'
                                        : 'bg-[var(--surface)] border border-[var(--border-subtle)]'
                                }`}
                            >
                                <input
                                    type="radio"
                                    checked={selectedInSelected === module.id}
                                    onChange={() => handleSelectedClick(module.id)}
                                    className="w-4 h-4 text-blue-600"
                                />
                                <div className="flex-1">
                                    <div className="font-medium">{module.name}</div>
                                    <div className="text-xs muted">{module.description}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
                        <button
                            onClick={removeModule}
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

                {/* Pool of Modules */}
                <div className="card p-6 rounded-xl">
                    <div className="mb-4">
                        <h4 className="font-bold text-lg mb-1">Pool of Modules</h4>
                        <p className="text-sm muted">Available modules</p>
                    </div>

                    <div className="space-y-3 mb-4 min-h-[300px]">
                        {poolModules.map((module) => (
                            <div
                                key={module.id}
                                onClick={() => handlePoolClick(module.id)}
                                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
                                    selectedInPool === module.id
                                        ? 'bg-green-600/20 border-2 border-green-600'
                                        : 'bg-[var(--surface)] border border-[var(--border-subtle)]'
                                }`}
                            >
                                <input
                                    type="radio"
                                    checked={selectedInPool === module.id}
                                    onChange={() => handlePoolClick(module.id)}
                                    className="w-4 h-4 text-blue-600"
                                />
                                <div className="flex-1">
                                    <div className="font-medium">{module.name}</div>
                                    <div className="text-xs muted">{module.description}</div>
                                </div>
                            </div>
                        ))}
                        {poolModules.length === 0 && (
                            <div className="text-center py-8 text-muted text-sm">
                                All modules are selected
                            </div>
                        )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
                        <button
                            onClick={addModule}
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
        </CourseLayout>
    );
};

export default DesignCourse;